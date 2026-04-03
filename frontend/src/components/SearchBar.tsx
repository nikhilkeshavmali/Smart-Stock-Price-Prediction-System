import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFrame, setTimeFrame] = useState("1w");
  const currentDate = new Date();
  const formattedDate = format(currentDate, "EEEE, MMMM yyyy");

  const handlePrediction = () => {
    console.log("Predicting for:", searchQuery, "Time frame:", timeFrame);
  };

  return (
    <div className="space-y-4 p-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl border border-gray-700">
      {/* Date */}
      <div className="text-right text-sm text-gray-400 italic">
        {formattedDate}
      </div>

      {/* Search & Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center">
        {/* Search Input */}
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search stocks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 pl-10 pr-4 rounded-xl bg-gray-900 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 transition-all duration-300 shadow-inner"
          />
        </div>

        {/* Timeframe Select */}
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger className="w-[150px] h-14 bg-gray-900 text-white rounded-xl shadow-md border border-gray-700">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-white rounded-xl shadow-lg border border-gray-700">
            <SelectItem value="1w">1 Week</SelectItem>
            <SelectItem value="1m">1 Month</SelectItem>
            <SelectItem value="3m">3 Months</SelectItem>
            <SelectItem value="6m">6 Months</SelectItem>
            <SelectItem value="1y">1 Year</SelectItem>
          </SelectContent>
        </Select>

        {/* Predict Button */}
        <Button
          onClick={handlePrediction}
          className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 h-14 px-6 text-lg font-semibold shadow-lg transition-transform hover:scale-105"
        >
          Predict Stock Price
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
