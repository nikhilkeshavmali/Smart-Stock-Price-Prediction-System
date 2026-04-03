import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface StockCardProps {
  stock: string; // e.g., "TATAMOTORS.NS"
  company_name: string; // e.g., "Tata Motors Limited"
  current_price_inr: number; // e.g., 64168.5
  trend: "Up" | "Down" | "Neutral"; // Trend determines prediction
  percentage_change: number; // e.g., 0.45
}

const StockCard = ({
  stock,
  company_name,
  current_price_inr,
  trend,
  percentage_change,
}: StockCardProps) => {
  // Determine prediction based on trend
  const prediction: "buy" | "sell" | "hold" =
    trend === "Up" ? "buy" : trend === "Down" ? "sell" : "hold";

  // Function to assign color based on prediction
  const getPredictionColor = (pred: string) => {
    switch (pred) {
      case "buy":
        return "text-success"; // Green color
      case "sell":
        return "text-destructive"; // Red color
      default:
        return "text-muted-foreground"; // Grey color
    }
  };

  return (
    <div className="stock-card p-4 border rounded-lg shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-semibold text-lg">{stock}</h3>
          <p className="text-sm text-muted-foreground">{company_name}</p>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium ${getPredictionColor(prediction)} bg-secondary`}
        >
          {prediction.toUpperCase()}
        </div>
      </div>
      <div className="flex justify-between items-end mt-4">
        <span className="text-xl font-bold">
          ₹{current_price_inr?.toLocaleString() || "N/A"}
        </span>
        <span
          className={`flex items-center ${percentage_change >= 0 ? "text-success" : "text-destructive"}`}
        >
          {percentage_change >= 0 ? (
            <ArrowUpIcon className="w-4 h-4 mr-1" />
          ) : (
            <ArrowDownIcon className="w-4 h-4 mr-1" />
          )}
          {Math.abs(percentage_change)}%
        </span>
      </div>
    </div>
  );
};

export default StockCard;
