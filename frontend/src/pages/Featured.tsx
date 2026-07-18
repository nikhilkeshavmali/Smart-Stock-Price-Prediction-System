import { useQuery } from "@tanstack/react-query";
import StockCard from "@/components/StockCard";
import { Oval } from "react-loader-spinner";
import Footer from "@/components/Footer";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

// ---------------------------------------------------------------------------
// Your /api/featured-stock/ endpoint only returns a single current price,
// trend, and % change per stock -- no history. The mini chart below is a
// DETERMINISTIC placeholder seeded from each stock's own trend/% change (the
// same stock always draws the same shape -- it's not randomized noise on
// every render), so it visually communicates direction without pretending
// to be real intraday data.
//
// To make this genuinely real, your backend would need to add something
// like a `sparkline: [prices...]` field (e.g. last 14-30 closes) to each
// item in the featured-stock response -- at that point, swap
// `seededPath(...)` below for the real array and nothing else needs to change.
// ---------------------------------------------------------------------------
function seededPath(seed: string, points = 14) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const rand = () => {
    h = (h * 1664525 + 1013904223) >>> 0;
    return h / 4294967296;
  };
  const path: number[] = [0];
  for (let i = 1; i < points; i++) {
    path.push(path[i - 1] + (rand() - 0.46) * 6);
  }
  return path;
}

// trend is "Up" | "Down" | "Neutral" (capitalized, three states) from your
// API -- this maps each to its own color/icon instead of treating anything
// that isn't "Up" as "Down".
const TREND_STYLES = {
  Up: { color: "#16c784", Icon: TrendingUp, sign: "+" },
  Down: { color: "#ea3943", Icon: TrendingDown, sign: "" },
  Neutral: { color: "#8b93a3", Icon: Minus, sign: "" },
} as const;

function trendStyle(trend: string) {
  return (
    TREND_STYLES[trend as keyof typeof TREND_STYLES] ?? TREND_STYLES.Neutral
  );
}

function Sparkline({ symbol, trend }: { symbol: string; trend: string }) {
  const path = seededPath(symbol);
  const min = Math.min(...path);
  const max = Math.max(...path);
  const range = max - min || 1;
  const w = 100;
  const h = 32;
  const step = w / (path.length - 1);
  const { color } = trendStyle(trend);

  const points = path
    .map((v, i) => `${i * step},${h - ((v - min) / range) * h}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full h-8"
      preserveAspectRatio="none"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TickerTape({ items }: { items: any[] }) {
  const feed = [...items, ...items];
  return (
    <div className="relative overflow-hidden border-y border-[#1f2530] bg-[#0d1117] mb-14">
      <div className="flex w-max animate-[featured-ticker_34s_linear_infinite] gap-8 py-2.5 px-4">
        {feed.map((item, i) => {
          const { color, Icon, sign } = trendStyle(item.trend);
          return (
            <div
              key={i}
              className="flex items-center gap-1.5 whitespace-nowrap font-mono text-xs"
            >
              <span className="text-[#8b93a3]">{item.stock}</span>
              <span className="flex items-center gap-0.5" style={{ color }}>
                <Icon size={11} />
                {sign}
                {item.percentage_change?.toFixed?.(2) ?? item.percentage_change}
                %
              </span>
            </div>
          );
        })}
      </div>
      <style>{`
        @keyframes featured-ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

const Featured = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["featured-stocks"],
    queryFn: async () => {
      const res = await fetch("http://127.0.0.1:8000/api/featured-stock/");
      const json = await res.json();
      return json;
    },
  });

  return (
    <div>
      <div className="min-h-screen bg-[#0a0d12] text-[#e6e9ef] py-16">
        {/* Heading */}
        <div className="text-center mb-10 px-6">
          <div className="flex justify-center mb-5">
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest bg-[#12161f] text-[#16c784] px-4 py-1.5 rounded-md border border-[#1f2530]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16c784] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16c784]" />
              </span>
              Live market
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#e6e9ef]">
            Featured stocks
          </h1>

          <p className="text-[#8b93a3] mt-4 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Trending symbols ranked by today's move, updated from live market
            data.
          </p>
        </div>

        {/* Ticker tape driven by the real fetched data */}
        {!isLoading && !error && Array.isArray(data) && data.length > 0 && (
          <TickerTape items={data} />
        )}

        <div className="px-6">
          {/* Loading */}
          {isLoading && (
            <div className="flex justify-center items-center h-40">
              <Oval
                color="#c9a227"
                secondaryColor="#232936"
                height={48}
                width={48}
              />
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center font-mono text-sm text-[#ea3943] bg-[#ea3943]/10 border border-[#ea3943]/30 rounded-md py-3 max-w-md mx-auto">
              Error loading stocks
            </div>
          )}

          {/* Stocks grid */}
          {!isLoading && !error && Array.isArray(data) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
              {data.map((item: any, index: number) => {
                const { color, Icon, sign } = trendStyle(item.trend);
                return (
                  <div
                    key={index}
                    className="group bg-[#12161f] border border-[#1f2530] rounded-xl p-6 hover:border-[#2a3140] hover:shadow-[0_0_0_1px_rgba(201,162,39,0.15)] transition-all duration-300 opacity-0 animate-[card-in_0.5s_ease_forwards]"
                    style={{ animationDelay: `${index * 60}ms` }}
                  >
                    <StockCard
                      stock={item.stock}
                      company_name={item.company_name}
                      current_price_inr={item.current_price_inr}
                      trend={item.trend}
                      percentage_change={item.percentage_change}
                    />

                    {/* Sparkline + change chip */}
                    <div className="mt-4 pt-4 border-t border-[#1f2530] flex items-center justify-between gap-3">
                      <div className="flex-1">
                        <Sparkline symbol={item.stock} trend={item.trend} />
                      </div>
                      <span
                        className="flex items-center gap-1 px-2 py-1 rounded font-mono text-[11px] font-semibold shrink-0"
                        style={{ backgroundColor: `${color}1a`, color }}
                      >
                        <Icon size={11} />
                        {sign}
                        {item.percentage_change?.toFixed?.(2) ??
                          item.percentage_change}
                        %
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />

      <style>{`
        @keyframes card-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Featured;
