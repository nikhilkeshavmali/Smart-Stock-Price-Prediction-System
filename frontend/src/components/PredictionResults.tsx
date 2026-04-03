import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface PredictionResultsProps {
  stockData?: {
    symbol: string;
    predictions: Array<{
      date: string;
      price: number;
    }>;
    trend: "up" | "down";
    insight?: string; // make optional
  };
}

const PredictionResults = ({ stockData }: PredictionResultsProps) => {
  // If no stockData or predictions array is empty
  if (
    !stockData ||
    !stockData.predictions ||
    stockData.predictions.length === 0
  ) {
    return (
      <p className="text-center text-white/70 italic mt-10 text-lg">
        No prediction results available. Search for a stock to see predictions.
      </p>
    );
  }

  return (
    <Card className="w-full mt-10 bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-2xl rounded-3xl border border-gray-700 hover:scale-[1.02] transition-transform duration-300">
      {/* Header */}
      <CardHeader className="border-b border-gray-700 pb-4">
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl md:text-2xl font-bold flex items-center gap-2">
            📶 {stockData.symbol} Price Prediction
          </span>
          <span
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
              stockData.trend === "up"
                ? "bg-green-900 text-green-400"
                : "bg-red-900 text-red-400"
            }`}
          >
            {stockData.trend === "up" ? (
              <ArrowUpIcon className="w-5 h-5" />
            ) : (
              <ArrowDownIcon className="w-5 h-5" />
            )}
            Future Trend
          </span>
        </CardTitle>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-12 md:space-y-16">
        {/* Chart */}
        <div className="h-[360px] w-full bg-gray-900/40 rounded-2xl p-4 shadow-inner backdrop-blur-sm border border-gray-700">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stockData.predictions}>
              <CartesianGrid strokeDasharray="4 4" stroke="#555" />
              <XAxis
                dataKey="date"
                stroke="#ccc"
                tick={{ fill: "#ccc" }}
                label={{
                  value: "Date",
                  position: "insideBottom",
                  offset: -5,
                  fill: "#aaa",
                }}
              />
              <YAxis
                stroke="#ccc"
                tick={{ fill: "#ccc" }}
                label={{
                  value: "Price",
                  angle: -90,
                  position: "insideLeft",
                  fill: "#aaa",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  borderColor: "#374151",
                }}
                itemStyle={{ color: "#fff" }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={stockData.trend === "up" ? "#22c55e" : "#ef4444"}
                strokeWidth={3}
                dot={{ r: 5, stroke: "#fff", strokeWidth: 2 }}
                activeDot={{ r: 8, stroke: "#fff", strokeWidth: 2 }}
                isAnimationActive
                animationDuration={700}
                animationEasing="ease-out"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Insight */}
        <div className="mt-4 p-6 bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-700 shadow-md hover:shadow-xl transition-shadow duration-300">
          <h3 className="text-2xl font-bold mb-3" style={{ color: "#7fc8f8" }}>
            ✨ Prediction Insight
          </h3>
          <p className="text-gray-100 leading-relaxed text-lg">
            {stockData.insight && stockData.insight.trim() !== ""
              ? stockData.insight
              : "No insight available for this stock."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PredictionResults;
