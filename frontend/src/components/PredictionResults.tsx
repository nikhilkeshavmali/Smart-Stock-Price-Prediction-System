import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  ComposedChart,
  Bar,
  Line,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { ArrowUpRight, ArrowDownRight, Download } from "lucide-react";

interface Candle {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

interface ForecastPoint {
  date: string;
  predictedClose: number;
  low: number;
  high: number;
}

interface PredictionResultsProps {
  stockData?: {
    symbol: string;
    trend: "up" | "down";
    historical: Candle[];
    prediction: ForecastPoint[];
    insight?: string;
  };
}

function downloadFile(filename: string, content: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function toCSV(historical: Candle[], prediction: ForecastPoint[]) {
  const rows = [
    [
      "type",
      "date",
      "open",
      "high",
      "low",
      "close",
      "volume",
      "predictedClose",
      "bandLow",
      "bandHigh",
    ],
    ...historical.map((c) => [
      "historical",
      c.date,
      c.open,
      c.high,
      c.low,
      c.close,
      c.volume ?? "",
      "",
      "",
      "",
    ]),
    ...prediction.map((p) => [
      "forecast",
      p.date,
      "",
      "",
      "",
      "",
      "",
      p.predictedClose,
      p.low,
      p.high,
    ]),
  ];
  return rows.map((r) => r.join(",")).join("\n");
}

function minOf(nums: number[]) {
  return nums.reduce((m, n) => (n < m ? n : m), nums[0] ?? 0);
}
function maxOf(nums: number[]) {
  return nums.reduce((m, n) => (n > m ? n : m), nums[0] ?? 0);
}

// Simple moving average over closing prices -- a real, computed indicator,
// not decoration.
function smaFor(historical: Candle[], index: number, period = 20) {
  if (index < period - 1) return undefined;
  let sum = 0;
  for (let i = index - period + 1; i <= index; i++) sum += historical[i].close;
  return +(sum / period).toFixed(2);
}

function Candlestick({ x, y, width, height, payload }: any) {
  if (payload.open === undefined || payload.open === null) return null;
  const { open, close, high, low } = payload;
  const up = close >= open;
  const color = up ? "#16c784" : "#ea3943";

  const range = payload.__yMax - payload.__yMin || 1;
  const scale = height / range;
  const yFor = (v: number) => y + (payload.__yMax - v) * scale;

  const bodyTop = yFor(Math.max(open, close));
  const bodyBottom = yFor(Math.min(open, close));
  const wickX = x + width / 2;
  const bodyWidth = Math.max(width * 0.56, 2);

  return (
    <g>
      <line
        x1={wickX}
        x2={wickX}
        y1={yFor(high)}
        y2={yFor(low)}
        stroke={color}
        strokeWidth={1}
      />
      <rect
        x={wickX - bodyWidth / 2}
        y={bodyTop}
        width={bodyWidth}
        height={Math.max(bodyBottom - bodyTop, 1)}
        fill={color}
      />
    </g>
  );
}

function VolumeBar({ x, y, width, height, payload }: any) {
  if (payload.volume === undefined || payload.volume === null) return null;
  const up = payload.close >= payload.open;
  return (
    <rect
      x={x + width * 0.15}
      y={y}
      width={width * 0.7}
      height={height}
      fill={up ? "#16c784" : "#ea3943"}
      fillOpacity={0.35}
    />
  );
}

function TerminalTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  const isForecast =
    p.predictedClose !== undefined && p.predictedClose !== null;

  return (
    <div className="bg-[#0d1117] border border-[#232936] rounded-md px-3 py-2 font-mono text-xs shadow-xl">
      <p className="text-[#6b7686] mb-1">{label}</p>
      {isForecast ? (
        <>
          <p className="text-[#c9a227]">
            Predicted:{" "}
            {p.predictedClose.toLocaleString("en-IN", {
              minimumFractionDigits: 2,
            })}
          </p>
          <p className="text-[#6b7686]">
            Range: {p.bandLow.toLocaleString("en-IN")} -{" "}
            {p.bandHigh.toLocaleString("en-IN")}
          </p>
        </>
      ) : p.open !== undefined && p.open !== null ? (
        <>
          <p className="text-[#e6e9ef]">
            O {p.open} · H {p.high}
          </p>
          <p className="text-[#e6e9ef]">
            L {p.low} · C {p.close}
          </p>
          {p.volume !== undefined && p.volume !== null && (
            <p className="text-[#6b7686]">
              Vol {p.volume.toLocaleString("en-IN")}
            </p>
          )}
        </>
      ) : null}
    </div>
  );
}

const PredictionResults = ({ stockData }: PredictionResultsProps) => {
  const [hovered, setHovered] = useState<Candle | null>(null);

  const hasData =
    !!stockData?.historical?.length && !!stockData?.prediction?.length;

  const hasVolume = useMemo(
    () =>
      !!stockData?.historical?.some(
        (c) => c.volume !== undefined && c.volume !== null,
      ),
    [stockData],
  );

  if (!hasData) {
    return (
      <p className="text-center text-[#6b7686] italic mt-10 text-sm font-mono">
        No prediction results available. Search for a stock to see predictions.
      </p>
    );
  }

  const { symbol, trend, historical, prediction, insight } = stockData!;
  const up = trend === "up";
  const color = up ? "#16c784" : "#ea3943";

  const allValues = [
    ...historical.flatMap((c) => [c.high, c.low]),
    ...prediction.flatMap((p) => [p.high, p.low]),
  ];
  const yMax = maxOf(allValues) * 1.02;
  const yMin = minOf(allValues) * 0.98;

  // One merged dataset drives the whole chart so the x-axis domain covers
  // both historical and forecast dates correctly. Historical rows carry
  // open/high/low/close/volume/sma; forecast rows carry
  // predictedClose/bandLow/bandHigh. Field names are kept distinct so the
  // candle wick (high/low) never collides with the forecast band.
  const merged = [
    ...historical.map((c, i) => ({
      date: c.date,
      open: c.open,
      high: c.high,
      low: c.low,
      close: c.close,
      volume: c.volume,
      sma: smaFor(historical, i, 20),
      __yMax: yMax,
      __yMin: yMin,
    })),
    ...prediction.map((p) => ({
      date: p.date,
      predictedClose: p.predictedClose,
      bandLow: p.low,
      bandHigh: p.high,
      __yMax: yMax,
      __yMin: yMin,
    })),
  ];

  const lastCandle = historical[historical.length - 1];
  const firstClose = historical[0].close;
  const changeAbs = lastCandle.close - firstClose;
  const changePct = firstClose !== 0 ? (changeAbs / firstClose) * 100 : 0;

  const target = prediction[prediction.length - 1].predictedClose;
  const targetUp = target >= lastCandle.close;

  const active = hovered ?? lastCandle;
  const activeUp = active.close >= active.open;

  const handleExportJSON = () => {
    downloadFile(
      `${symbol}-forecast.json`,
      JSON.stringify(
        { symbol, trend, historical, prediction, insight },
        null,
        2,
      ),
      "application/json",
    );
  };

  const handleExportCSV = () => {
    downloadFile(
      `${symbol}-forecast.csv`,
      toCSV(historical, prediction),
      "text/csv",
    );
  };

  return (
    <Card className="w-full mt-10 bg-[#12161f] text-[#e6e9ef] rounded-xl border border-[#1f2530] shadow-2xl">
      {/* Title bar */}
      <CardHeader className="border-b border-[#1f2530] pb-4">
        <CardTitle className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: color }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: color }}
              />
            </span>
            <span className="font-mono text-lg font-semibold tracking-tight">
              {symbol}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#6b7686] px-2 py-0.5 rounded bg-[#1a2029] border border-[#232936]">
              forecast
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="flex items-center gap-1.5 px-3 py-1 rounded-md font-mono text-xs font-semibold"
              style={{ backgroundColor: `${color}1a`, color }}
            >
              {up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {up ? "+" : ""}
              {changeAbs.toFixed(2)} ({changePct.toFixed(2)}%)
            </span>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[10px] uppercase tracking-widest text-[#8b93a3] bg-[#1a2029] border border-[#232936] hover:border-[#c9a227] hover:text-[#c9a227] transition-colors"
            >
              <Download size={12} />
              CSV
            </button>
            <button
              onClick={handleExportJSON}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md font-mono text-[10px] uppercase tracking-widest text-[#8b93a3] bg-[#1a2029] border border-[#232936] hover:border-[#c9a227] hover:text-[#c9a227] transition-colors"
            >
              <Download size={12} />
              JSON
            </button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6 pt-6">
        {/* Price header */}
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-3xl font-semibold">
              {lastCandle.close.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </span>
            <span className="font-mono text-xs text-[#6b7686] uppercase tracking-widest">
              last close
            </span>
          </div>

          <div className="text-right">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[#6b7686]">
              Predicted target
            </p>
            <p
              className={`font-mono text-lg font-semibold ${
                targetUp ? "text-[#16c784]" : "text-[#ea3943]"
              }`}
            >
              {target.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>

        {/* Live OHLC readout -- updates on hover */}
        <div
          className="font-mono text-xs flex flex-wrap items-center gap-x-4 gap-y-1"
          style={{ color: activeUp ? "#16c784" : "#ea3943" }}
        >
          <span className="text-[#6b7686]">{active.date}</span>
          <span>
            O <span className="text-[#e6e9ef]">{active.open.toFixed(2)}</span>
          </span>
          <span>
            H <span className="text-[#e6e9ef]">{active.high.toFixed(2)}</span>
          </span>
          <span>
            L <span className="text-[#e6e9ef]">{active.low.toFixed(2)}</span>
          </span>
          <span>
            C <span className="text-[#e6e9ef]">{active.close.toFixed(2)}</span>
          </span>
          {active.volume !== undefined && active.volume !== null && (
            <span>
              Vol{" "}
              <span className="text-[#e6e9ef]">
                {active.volume.toLocaleString("en-IN")}
              </span>
            </span>
          )}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-[#6b7686]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm bg-[#16c784] inline-block" />
            Up day
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm bg-[#ea3943] inline-block" />
            Down day
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-[#7b8ab8] inline-block" />
            SMA 20
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 border-t border-dashed border-[#c9a227] inline-block" />
            Forecast
          </span>
        </div>

        {/* Main candlestick chart */}
        <div className="h-[360px] w-full bg-[#0a0d12] rounded-lg p-4 border border-[#1f2530]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={merged}
              margin={{ top: 5, right: 5, left: 0, bottom: 0 }}
              onMouseMove={(e: any) => {
                const p = e?.activePayload?.[0]?.payload;
                if (p?.open !== undefined && p?.open !== null) setHovered(p);
              }}
              onMouseLeave={() => setHovered(null)}
            >
              <XAxis
                dataKey="date"
                stroke="#232936"
                tick={{
                  fill: "#6b7686",
                  fontSize: 10,
                  fontFamily: "monospace",
                }}
                tickLine={false}
                minTickGap={28}
              />
              <YAxis
                domain={[yMin, yMax]}
                stroke="#232936"
                tick={{
                  fill: "#6b7686",
                  fontSize: 10,
                  fontFamily: "monospace",
                }}
                tickLine={false}
                axisLine={false}
                width={55}
              />
              <Tooltip
                content={<TerminalTooltip />}
                cursor={{ stroke: "#3a4252", strokeDasharray: "3 3" }}
              />

              <ReferenceLine
                x={lastCandle.date}
                stroke="#232936"
                strokeDasharray="3 3"
              />
              <ReferenceLine
                y={active.close}
                stroke="#2a313d"
                strokeDasharray="2 4"
              />

              {/* confidence band around the forecast */}
              <Area
                dataKey="bandHigh"
                stroke="none"
                fill="#c9a227"
                fillOpacity={0.08}
                connectNulls={false}
                isAnimationActive={false}
              />
              <Area
                dataKey="bandLow"
                stroke="none"
                fill="#0a0d12"
                fillOpacity={1}
                connectNulls={false}
                isAnimationActive={false}
              />

              {/* real historical candlesticks */}
              <Bar
                dataKey="close"
                shape={<Candlestick />}
                isAnimationActive={false}
              />

              {/* 20-day moving average */}
              <Line
                dataKey="sma"
                stroke="#7b8ab8"
                strokeWidth={1.5}
                dot={false}
                connectNulls={false}
                isAnimationActive={false}
              />

              {/* forecast line */}
              <Line
                dataKey="predictedClose"
                stroke="#c9a227"
                strokeWidth={2}
                strokeDasharray="5 4"
                dot={false}
                connectNulls={false}
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Volume panel -- only renders if the backend sends volume data */}
        {hasVolume && (
          <div className="h-[100px] w-full bg-[#0a0d12] rounded-lg p-2 border border-[#1f2530]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={merged.filter(
                  (d) => 'volume' in d && d.volume !== undefined && d.volume !== null,
                )}
                margin={{ top: 0, right: 5, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="date" hide />
                <YAxis hide domain={[0, "dataMax"]} />
                <Bar
                  dataKey="volume"
                  shape={<VolumeBar />}
                  isAnimationActive={false}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Insight */}
        <div className="p-5 bg-[#0d1117] rounded-lg border border-[#1f2530]">
          <h3 className="font-mono text-[10px] uppercase tracking-widest text-[#c9a227] mb-2">
            Model insight
          </h3>
          <p className="text-[#c3c8d1] leading-relaxed text-sm">
            {insight && insight.trim() !== ""
              ? insight
              : "No insight available for this stock."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionResults;
