import { useState, useEffect, useRef } from "react";
import PredictionResults from "@/components/PredictionResults";
import { Search, TrendingUp, TrendingDown, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Oval } from "react-loader-spinner";
import { allStockSymbols } from "@/data/stocks";
import Footer from "@/components/Footer";

// ---------------------------------------------------------------------------
// Mock ticker-tape feed. Swap this for a real index/quote endpoint whenever
// you wire one up — the tape just needs { symbol, price, change } objects.
// ---------------------------------------------------------------------------
const TICKER_FEED = [
  { symbol: "NIFTY 50", price: 24812.35, change: 0.42 },
  { symbol: "SENSEX", price: 81743.1, change: 0.38 },
  { symbol: "RELIANCE", price: 2945.6, change: -0.65 },
  { symbol: "TCS", price: 3812.15, change: 0.91 },
  { symbol: "INFY", price: 1587.4, change: -0.22 },
  { symbol: "HDFCBANK", price: 1642.8, change: 0.15 },
  { symbol: "AAPL", price: 231.42, change: 1.12 },
  { symbol: "TSLA", price: 342.87, change: -2.04 },
  { symbol: "MSFT", price: 468.21, change: 0.53 },
];

const DURATIONS = [
  { value: "1w", label: "1W" },
  { value: "1m", label: "1M" },
  { value: "3m", label: "3M" },
  { value: "6m", label: "6M" },
  { value: "1y", label: "1Y" },
  { value: "5y", label: "5Y" },
];

function TickerTape() {
  const feed = [...TICKER_FEED, ...TICKER_FEED]; // duplicate for seamless loop
  return (
    <div className="relative overflow-hidden border-b border-[#1f2530] bg-[#0d1117]">
      <div className="flex w-max animate-[ticker-scroll_38s_linear_infinite] gap-8 py-2 px-4">
        {feed.map((t, i) => {
          const up = t.change >= 0;
          return (
            <div
              key={i}
              className="flex items-center gap-2 whitespace-nowrap font-mono text-xs tracking-tight"
            >
              <span className="text-[#8b93a3]">{t.symbol}</span>
              <span className="text-[#e6e9ef]">
                {t.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
              <span
                className={`flex items-center gap-0.5 ${up ? "text-[#16c784]" : "text-[#ea3943]"}`}
              >
                {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                {up ? "+" : ""}
                {t.change.toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
      {/* edge fades so the loop doesn't hard-cut at the viewport edge */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0d1117] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0d1117] to-transparent" />
    </div>
  );
}

const Prediction = () => {
  const [stock, setStock] = useState("");
  const [stockLabel, setStockLabel] = useState("");
  const [duration, setDuration] = useState("1y");
  const [loading, setLoading] = useState(false);
  const [predictionData, setPredictionData] = useState(null);

  const [search, setSearch] = useState("");
  const [filteredStocks, setFilteredStocks] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredStocks([]);
      return;
    }
    const filtered = allStockSymbols
      .filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.symbol.toLowerCase().includes(search.toLowerCase()),
      )
      .slice(0, 8);
    setFilteredStocks(filtered);
  }, [search]);

  const handlePrediction = async () => {
    if (!stock) return;
    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/api/stock/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock, duration }),
      });
      const data = await response.json();
      setPredictionData(data);
    } catch (error) {
      console.error("Prediction error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0a0d12]">
      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .terminal-grid {
          background-image:
            linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 34px 34px;
        }
        .font-display { font-family: 'Space Grotesk', 'Inter', sans-serif; }
        .font-data { font-family: 'IBM Plex Mono', 'Menlo', monospace; font-variant-numeric: tabular-nums; }
      `}</style>

      <TickerTape />

      <div className="min-h-screen terminal-grid text-[#e6e9ef] px-4 py-10">
        <div className="max-w-6xl mx-auto">
          {/* Header bar */}
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-[#1f2530]">
            <div>
              <h1 className="font-display text-2xl font-semibold tracking-tight">
                Stock<span className="text-[#c9a227]">Sight</span>
              </h1>
              <p className="font-data text-[11px] text-[#6b7686] mt-1 uppercase tracking-widest">
                AI-driven price forecasting terminal
              </p>
            </div>
            <div className="flex items-center gap-2 font-data text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16c784] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16c784]" />
              </span>
              <span className="text-[#8b93a3]">MARKET OPEN</span>
            </div>
          </div>

          {/* Order-entry / search panel */}
          <div className="bg-[#12161f] border border-[#1f2530] rounded-xl p-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-4 items-end">
              {/* Symbol search */}
              <div className="relative">
                <label className="font-data text-[10px] uppercase tracking-widest text-[#6b7686] mb-2 block">
                  Symbol
                </label>
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7686]"
                  />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="RELIANCE, AAPL, TCS..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setStock("");
                    }}
                    className="w-full pl-9 pr-3 h-11 rounded-md bg-[#0a0d12] border border-[#232936] text-[#e6e9ef] font-data text-sm placeholder:text-[#4b5566] focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/40 outline-none transition-colors"
                  />
                </div>

                {filteredStocks.length > 0 && (
                  <div className="absolute z-50 mt-1 w-full bg-[#12161f] border border-[#232936] rounded-md max-h-64 overflow-y-auto shadow-2xl">
                    {filteredStocks.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => {
                          setStock(item.symbol);
                          setStockLabel(item.name);
                          setSearch(`${item.name} (${item.symbol})`);
                          setFilteredStocks([]);
                        }}
                        className="flex items-center justify-between px-4 py-2.5 cursor-pointer hover:bg-[#1a2029] border-b border-[#1f2530] last:border-0 transition-colors"
                      >
                        <div>
                          <p className="text-sm text-[#e6e9ef]">{item.name}</p>
                          <p className="font-data text-[11px] text-[#6b7686]">
                            {item.symbol}
                          </p>
                        </div>
                        <span className="font-data text-[10px] px-2 py-0.5 rounded bg-[#1a2029] text-[#8b93a3] border border-[#232936]">
                          {item.exchange || "NSE"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Duration segmented control */}
              <div>
                <label className="font-data text-[10px] uppercase tracking-widest text-[#6b7686] mb-2 block">
                  Horizon
                </label>
                <div className="flex bg-[#0a0d12] border border-[#232936] rounded-md p-1">
                  {DURATIONS.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setDuration(d.value)}
                      className={`font-data text-xs px-3 h-9 rounded transition-colors ${
                        duration === d.value
                          ? "bg-[#c9a227] text-[#0a0d12] font-semibold"
                          : "text-[#8b93a3] hover:text-[#e6e9ef]"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Predict button */}
              <Button
                onClick={handlePrediction}
                disabled={!stock || loading}
                className="h-11 px-6 font-data text-sm font-semibold rounded-md bg-[#16c784] hover:bg-[#13b378] text-[#0a0d12] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "ANALYZING…" : "RUN FORECAST"}
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="mt-10">
            {loading ? (
              <div className="bg-[#12161f] border border-[#1f2530] rounded-xl py-16 flex flex-col items-center gap-4">
                <Oval
                  color="#c9a227"
                  secondaryColor="#232936"
                  height={48}
                  width={48}
                />
                <p className="font-data text-xs text-[#6b7686] uppercase tracking-widest">
                  Crunching {duration.toUpperCase()} of price data…
                </p>
              </div>
            ) : predictionData ? (
              <div className="bg-[#12161f] border border-[#1f2530] rounded-xl overflow-hidden animate-fade-in">
                {/* Terminal window title bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-[#1f2530] bg-[#0d1117]">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16c784] opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#16c784]" />
                    </span>
                    <span className="font-data text-sm font-semibold text-[#e6e9ef]">
                      {stock}
                    </span>
                    {stockLabel && (
                      <span className="text-xs text-[#6b7686]">
                        {stockLabel}
                      </span>
                    )}
                  </div>
                  <span className="font-data text-[10px] px-2 py-0.5 rounded bg-[#1a2029] text-[#8b93a3] border border-[#232936] uppercase">
                    {duration} forecast
                  </span>
                </div>
                <div className="p-5">
                  <PredictionResults stockData={predictionData} />
                </div>
              </div>
            ) : (
              <div className="bg-[#12161f] border border-dashed border-[#232936] rounded-xl py-16 text-center">
                <Circle
                  size={8}
                  className="mx-auto mb-3 text-[#232936] fill-current"
                />
                <p className="font-data text-xs text-[#6b7686] uppercase tracking-widest">
                  Awaiting symbol selection
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Prediction;
