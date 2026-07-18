import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StockCardProps {
  stock: string;
  company_name: string;
  current_price_inr: number;
  trend: "Up" | "Down" | "Neutral";
  percentage_change: number;
}

const TREND_STYLES = {
  Up: { color: "#16c784", label: "BUY", Icon: TrendingUp },
  Down: { color: "#ea3943", label: "SELL", Icon: TrendingDown },
  Neutral: { color: "#8b93a3", label: "HOLD", Icon: Minus },
} as const;

const StockCard = ({
  stock,
  company_name,
  current_price_inr,
  trend,
  percentage_change,
}: StockCardProps) => {
  // Fall back to Neutral for any unexpected value so an unrecognized trend
  // never silently reads as "Down" (red) the way a naive default would.
  const { color, label, Icon } = TREND_STYLES[trend] ?? TREND_STYLES.Neutral;

  // The change chip's direction follows the actual sign of percentage_change
  // rather than the model's trend label -- they usually agree, but this
  // keeps the arrow honest even in an edge case where they don't.
  const changeUp = percentage_change > 0;
  const changeFlat = percentage_change === 0;
  const changeColor = changeFlat ? "#8b93a3" : changeUp ? "#16c784" : "#ea3943";

  return (
    <div className="bg-[#0a0d12] border border-[#1f2530] rounded-lg p-4 hover:border-[#2a3140] transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-mono font-semibold text-base text-[#e6e9ef] tracking-tight">
            {stock}
          </h3>
          <p className="text-xs text-[#6b7686] mt-0.5">{company_name}</p>
        </div>

        <span
          className="flex items-center gap-1 px-2.5 py-1 rounded font-mono text-[10px] font-semibold uppercase tracking-widest shrink-0"
          style={{ backgroundColor: `${color}1a`, color }}
        >
          <Icon size={11} />
          {label}
        </span>
      </div>

      <div className="flex justify-between items-end">
        <span className="font-mono text-xl font-semibold text-[#e6e9ef]">
          ₹{current_price_inr?.toLocaleString("en-IN") ?? "N/A"}
        </span>

        <span
          className="flex items-center gap-1 font-mono text-sm font-medium"
          style={{ color: changeColor }}
        >
          {changeFlat ? (
            <Minus className="w-3.5 h-3.5" />
          ) : changeUp ? (
            <TrendingUp className="w-3.5 h-3.5" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5" />
          )}
          {Math.abs(percentage_change).toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

export default StockCard;
