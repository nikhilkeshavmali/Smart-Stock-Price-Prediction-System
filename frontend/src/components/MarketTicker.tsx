import { useEffect, useState } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface MarketData {
  name: string;
  value: number;
  change: number;
}

const MarketTicker = () => {
  const [markets, setMarkets] = useState<MarketData[]>([
    { name: "NIFTY 50", value: 21850.50, change: 0.75 },
    { name: "SENSEX", value: 72012.30, change: -0.25 },
    { name: "NIFTY BANK", value: 45678.90, change: 1.20 },
    { name: "NIFTY MIDCAP 100", value: 31245.67, change: 0.50 },
  ]);

  return (
    <div className="w-full overflow-hidden bg-black backdrop-blur-sm border-y border-border">
      <div className="flex justify-center animate-[scroll_20s_linear_infinite] gap-8 py-3">
        {markets.map((market, index) => (
          <div
            key={index}
            className="flex items-center gap-4 px-4 transition-transform transform hover:scale-105"
          >
            <span className="font-medium text-sm text-muted-foreground">
              {market.name}
            </span>
            <span className="font-semibold">
              {market.value.toLocaleString()}
            </span>
            <span
              className={`flex items-center text-sm ${
                market.change >= 0 ? "text-success" : "text-destructive"
              }`}
            >
              {market.change >= 0 ? (
                <ArrowUpIcon className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDownIcon className="w-4 h-4 mr-1" />
              )}
              {Math.abs(market.change)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketTicker;