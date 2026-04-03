import { useState, useEffect } from "react";
import StockCard from "@/components/StockCard";
import NewsCard from "@/components/NewsCard";
import PredictionResults from "@/components/PredictionResults";
import { Search } from "lucide-react";
import { Button } from "../components/ui/button";
import { format } from "date-fns";
import toast, { Toaster } from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { ChatWidget } from "@/components/ChatWidget";
import Footer from "@/components/Footer";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import MarketTicker from "@/components/MarketTicker";

const Index = () => {
  const navigate = useNavigate();

  // Loading states
  const [loadingFeatured, setLoadingFeatured] = useState(false);
  const [loadingNews, setLoadingNews] = useState(false);
  const [loadingPrediction, setLoadingPrediction] = useState(false);

  const [featuredStocks, setFeaturedStocks] = useState([]);
  const [newsItems, setNewsItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [predictionData, setPredictionData] = useState(null);
  const [timeFrame, setTimeFrame] = useState("1y");
  const [stockSuggestions, setStockSuggestions] = useState([]);
  const currentDate = new Date();
  const formattedDate = format(currentDate, "EEEE, MMMM yyyy");

  // All stock symbols with full names
  const allStockSymbols = [
    { symbol: "AAPL", name: "Apple Inc." },
    { symbol: "GOOGL", name: "Alphabet Inc. (Class A)" },
    { symbol: "MSFT", name: "Microsoft Corporation" },
    { symbol: "AMZN", name: "Amazon.com, Inc." },
    { symbol: "TSLA", name: "Tesla, Inc." },
    { symbol: "META", name: "Meta Platforms, Inc." },
    { symbol: "NVDA", name: "NVIDIA Corporation" },
    { symbol: "NFLX", name: "Netflix, Inc." },
    { symbol: "BRK.B", name: "Berkshire Hathaway Inc. (Class B)" },
    { symbol: "JPM", name: "JPMorgan Chase & Co." },
    { symbol: "NIFTY50", name: "NIFTY 50 Index" },
    { symbol: "SENSEX", name: "BSE Sensex Index" },
    { symbol: "AOS", name: "A. O. Smith Corporation" },
    { symbol: "ABT", name: "Abbott Laboratories" },
    { symbol: "ABBV", name: "AbbVie Inc." },
    { symbol: "ACN", name: "Accenture plc" },
    { symbol: "ADBE", name: "Adobe Inc." },
    { symbol: "AMD", name: "Advanced Micro Devices, Inc." },
    { symbol: "AES", name: "The AES Corporation" },
    { symbol: "AFL", name: "Aflac Incorporated" },
    { symbol: "A", name: "Agilent Technologies, Inc." },
    { symbol: "APD", name: "Air Products and Chemicals, Inc." },
    { symbol: "ABNB", name: "Airbnb, Inc." },
    { symbol: "AKAM", name: "Akamai Technologies, Inc." },
    { symbol: "ALB", name: "Albemarle Corporation" },
    { symbol: "ARE", name: "Alexandria Real Estate Equities, Inc." },
    { symbol: "ALGN", name: "Align Technology, Inc." },
    { symbol: "ALLE", name: "Allegion plc" },
    { symbol: "LNT", name: "Alliant Energy Corporation" },
    { symbol: "ALL", name: "The Allstate Corporation" },
    { symbol: "GOOG", name: "Alphabet Inc. (Class C)" },
    { symbol: "MO", name: "Altria Group, Inc." },
    { symbol: "AMCR", name: "Amcor plc" },
    { symbol: "AEE", name: "Ameren Corporation" },
    { symbol: "AEP", name: "American Electric Power Company, Inc." },
    { symbol: "AXP", name: "American Express Company" },
    { symbol: "AIG", name: "American International Group, Inc." },
    { symbol: "AMT", name: "American Tower Corporation" },
    { symbol: "AWK", name: "American Water Works Company, Inc." },
    { symbol: "AMP", name: "Ameriprise Financial, Inc." },
    { symbol: "AME", name: "AMETEK, Inc." },
    { symbol: "AMGN", name: "Amgen Inc." },
    { symbol: "APH", name: "Amphenol Corporation" },
    { symbol: "ADI", name: "Analog Devices, Inc." },
    { symbol: "ANSS", name: "ANSYS, Inc." },
    { symbol: "AON", name: "Aon plc" },
    { symbol: "APA", name: "APA Corporation" },
    { symbol: "APO", name: "Apollo Global Management, Inc." },
    { symbol: "AMAT", name: "Applied Materials, Inc." },
    { symbol: "APTV", name: "Aptiv PLC" },
    { symbol: "ACGL", name: "Arch Capital Group Ltd." },
    { symbol: "ADM", name: "Archer-Daniels-Midland Company" },
    { symbol: "ANET", name: "Arista Networks, Inc." },
    { symbol: "AJG", name: "Arthur J. Gallagher & Co." },
    { symbol: "AIZ", name: "Assurant, Inc." },
    { symbol: "T", name: "AT&T Inc." },
    { symbol: "ATO", name: "Atmos Energy Corporation" },
    { symbol: "ADSK", name: "Autodesk, Inc." },
    { symbol: "ADP", name: "Automatic Data Processing, Inc." },
    { symbol: "AZO", name: "AutoZone, Inc." },
    { symbol: "AVB", name: "AvalonBay Communities, Inc." },
    { symbol: "AVY", name: "Avery Dennison Corporation" },
    { symbol: "AXON", name: "Axon Enterprise, Inc." },
    { symbol: "BKR", name: "Baker Hughes Company" },
    { symbol: "BALL", name: "Ball Corporation" },
    { symbol: "BAC", name: "Bank of America Corporation" },
    { symbol: "BAX", name: "Baxter International Inc." },
    { symbol: "BDX", name: "Becton, Dickinson and Company" },
    { symbol: "BBY", name: "Best Buy Co., Inc." },
    { symbol: "TECH", name: "Bio-Techne Corporation" },
    { symbol: "BIIB", name: "Biogen Inc." },
    { symbol: "BLK", name: "BlackRock, Inc." },
    { symbol: "BX", name: "Blackstone Inc." },
    { symbol: "BK", name: "Bank of New York Mellon Corporation" },
    { symbol: "BA", name: "Boeing Company" },
    { symbol: "BKNG", name: "Booking Holdings Inc." },
    { symbol: "BWA", name: "BorgWarner Inc." },
    { symbol: "BSX", name: "Boston Scientific Corporation" },
    { symbol: "BMY", name: "Bristol-Myers Squibb Company" },
    { symbol: "AVGO", name: "Broadcom Inc." },
    { symbol: "BR", name: "Broadridge Financial Solutions, Inc." },
    { symbol: "BRO", name: "Brown & Brown, Inc." },
    { symbol: "BLDR", name: "Builders FirstSource, Inc." },
    { symbol: "BG", name: "Bunge Global SA" },
    { symbol: "BXP", name: "Boston Properties, Inc." },
    { symbol: "CHRW", name: "C. H. Robinson Worldwide, Inc." },
    { symbol: "CDNS", name: "Cadence Design Systems, Inc." },
    { symbol: "CZR", name: "Caesars Entertainment, Inc." },
    { symbol: "CPT", name: "Camden Property Trust" },
    { symbol: "CPB", name: "Campbell Soup Company" },
    { symbol: "COF", name: "Capital One Financial Corporation" },
    { symbol: "CAH", name: "Cardinal Health, Inc." },
    { symbol: "KMX", name: "CarMax, Inc." },
    { symbol: "CCL", name: "Carnival Corporation & plc" },
    { symbol: "CARR", name: "Carrier Global Corporation" },
    { symbol: "CAT", name: "Caterpillar Inc." },
    { symbol: "CBOE", name: "Cboe Global Markets, Inc." },
    { symbol: "CBRE", name: "CBRE Group, Inc." },
    { symbol: "CDW", name: "CDW Corporation" },
    { symbol: "CE", name: "Celanese Corporation" },
    { symbol: "COR", name: "Cencora, Inc." },
    { symbol: "CNC", name: "Centene Corporation" },
    { symbol: "CNP", name: "CenterPoint Energy, Inc." },
    { symbol: "CF", name: "CF Industries Holdings, Inc." },
    { symbol: "CRL", name: "Charles River Laboratories International, Inc." },
    { symbol: "SCHW", name: "Charles Schwab Corporation" },
    { symbol: "CHTR", name: "Charter Communications, Inc." },
    { symbol: "CVX", name: "Chevron Corporation" },
    { symbol: "CMG", name: "Chipotle Mexican Grill, Inc." },
    { symbol: "CB", name: "Chubb Limited" },
    { symbol: "CHD", name: "Church & Dwight Co., Inc." },
    { symbol: "CI", name: "The Cigna Group" },
    { symbol: "CINF", name: "Cincinnati Financial Corporation" },
    { symbol: "CTAS", name: "Cintas Corporation" },
    { symbol: "CSCO", name: "Cisco Systems, Inc." },
    { symbol: "C", name: "Citigroup Inc." },
    { symbol: "CFG", name: "Citizens Financial Group, Inc." },
    { symbol: "CLX", name: "The Clorox Company" },
    { symbol: "CME", name: "CME Group Inc." },
    { symbol: "CMS", name: "CMS Energy Corporation" },
    { symbol: "KO", name: "The Coca-Cola Company" },
    { symbol: "CTSH", name: "Cognizant Technology Solutions Corporation" },
    { symbol: "CL", name: "Colgate-Palmolive Company" },
    { symbol: "CMCSA", name: "Comcast Corporation" },
    { symbol: "CAG", name: "Conagra Brands, Inc." },
    { symbol: "COP", name: "ConocoPhillips" },
    { symbol: "ED", name: "Consolidated Edison, Inc." },
    { symbol: "STZ", name: "Constellation Brands, Inc." },
    { symbol: "CEG", name: "Constellation Energy Corporation" },
    { symbol: "COO", name: "The Cooper Companies, Inc." },
    { symbol: "CPRT", name: "Copart, Inc." },
    { symbol: "GLW", name: "Corning Incorporated" },
    { symbol: "CPAY", name: "Corpay, Inc." },
    { symbol: "CTVA", name: "Corteva, Inc." },
    { symbol: "CSGP", name: "CoStar Group, Inc." },
    { symbol: "COST", name: "Costco Wholesale Corporation" },
    { symbol: "CTRA", name: "Coterra Energy Inc." },
    { symbol: "CRWD", name: "CrowdStrike Holdings, Inc." },
    { symbol: "CCI", name: "Crown Castle Inc." },
    { symbol: "CSX", name: "CSX Corporation" },
    { symbol: "CMI", name: "Cummins Inc." },
    { symbol: "CVS", name: "CVS Health Corporation" },
    { symbol: "DHR", name: "Danaher Corporation" },
    { symbol: "DRI", name: "Darden Restaurants, Inc." },
    { symbol: "DVA", name: "DaVita Inc." },
    { symbol: "DAY", name: "Dayforce, Inc." },
    { symbol: "DECK", name: "Deckers Outdoor Corporation" },
    { symbol: "DE", name: "Deere & Company" },
    { symbol: "DELL", name: "Dell Technologies Inc." },
    { symbol: "DAL", name: "Delta Air Lines, Inc." },
    { symbol: "DVN", name: "Devon Energy Corporation" },
  ];

  // Fetch Featured Stocks
  const fetchFeaturedStock = async () => {
    try {
      setLoadingFeatured(true);
      const response = await fetch(
        "http://127.0.0.1:8000/api/featured-stock/",
        { method: "POST" },
      );
      if (!response.ok) throw new Error("Failed to fetch featured stocks");
      const data = await response.json();
      setFeaturedStocks(data.slice(0, 50));
    } catch (err) {
      toast.error("Error fetching featured stocks");
    } finally {
      setLoadingFeatured(false);
    }
  };

  // Fetch News
  const fetchNews = async () => {
    try {
      setLoadingNews(true);
      const response = await fetch("http://127.0.0.1:8000/api/news/", {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to fetch news");
      const data = await response.json();
      setNewsItems(data);
    } catch (err) {
      toast.error("Error fetching news");
    } finally {
      setLoadingNews(false);
    }
  };

  // Stock Suggestions
  const updateStockSuggestions = (query) => {
    if (!query) {
      setStockSuggestions([]);
      return;
    }
    const filtered = allStockSymbols.filter(
      (stock) =>
        stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
        stock.name.toLowerCase().includes(query.toLowerCase()),
    );
    setStockSuggestions(filtered);
  };

  useEffect(() => {
    fetchFeaturedStock();
    fetchNews();
  }, []);

  useEffect(() => {
    updateStockSuggestions(searchQuery);
  }, [searchQuery]);

  // Handle Prediction
  const handlePrediction = async () => {
    if (!searchQuery || !timeFrame) {
      toast.error("Please select stock and duration");
      return;
    }
    try {
      setLoadingPrediction(true);
      const response = await fetch("http://127.0.0.1:8000/api/stock/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stock: searchQuery, duration: timeFrame }),
      });
      if (!response.ok) throw new Error("Prediction failed");
      const data = await response.json();
      setPredictionData(data);
      toast.success("Prediction loaded successfully");
    } catch (err) {
      toast.error("Error fetching prediction");
    } finally {
      setLoadingPrediction(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-950 via-black to-blue-950 text-white font-sans">
      <Toaster />

      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900 via-blue-900 to-indigo-900 animate-gradient-background blur-3xl opacity-70"></div>
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-500/20 rounded-full animate-pulse-slow"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-500/20 rounded-full animate-pulse-slow"></div>

        <div className="relative z-10 flex flex-col items-center space-y-6">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 flex items-center justify-center shadow-xl animate-bounce-slow">
            <span className="text-white text-4xl">📈</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent animate-slide-in text-shadow-lg">
            Smart Stock Predictor
          </h1>
          <p className="max-w-2xl text-white/80 text-lg md:text-xl animate-fade-in">
            AI-powered insights to predict stock trends. Make smarter investment
            decisions with real-time analytics and market intelligence.
          </p>
          <div className="flex gap-4 mt-4 animate-fade-in delay-200">
            <Button
              onClick={() => window.open("http://localhost:5174/", "_blank")}
              className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 px-6 py-3 text-lg font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              Try AI Chart Analyzer
            </Button>
            <Link to="/profile">
              <Button className="bg-white/20 backdrop-blur-md text-white px-6 py-3 font-semibold shadow-lg hover:scale-105 transition-transform">
                Your Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Nifty / Stock Ticker */}
      <section className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl mx-4 -mt-16 p-4 flex justify-between items-center overflow-x-auto gap-6">
        <h2 className="text-xl font-semibold">📈 Nifty & Major Stocks</h2>
        <MarketTicker />
      </section>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Search & Prediction */}
        <section className="relative w-full min-h-[80vh] flex flex-col justify-center items-center px-4 py-16 overflow-hidden">
          {/* Animated Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 via-purple-900/20 to-blue-900/30 blur-3xl -z-10"></div>

          {/* Section Heading */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">
              🔮 AI Stock Price Prediction
            </h1>
            <p className="text-gray-400 mt-3 text-lg">
              Smart insights powered by intelligent forecasting
            </p>
          </div>

          {/* Search Card */}
          <div className="w-full max-w-6xl bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl transition-all duration-500 hover:shadow-purple-500/20">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              {/* Search Input */}
              <div className="relative w-full lg:w-1/2">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-white/60" />
                </div>
                <input
                  type="text"
                  placeholder="Search stock symbol..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => setTimeout(() => setStockSuggestions([]), 200)}
                  className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white/10 border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 shadow-inner"
                />

                {searchQuery && stockSuggestions.length > 0 && (
                  <ul className="absolute z-50 left-0 right-0 bg-gray-900 border border-white/10 rounded-xl mt-2 shadow-xl max-h-52 overflow-y-auto backdrop-blur-xl">
                    {stockSuggestions.map((stock, index) => (
                      <li
                        key={index}
                        onMouseDown={() => {
                          setSearchQuery(stock.symbol);
                          setStockSuggestions([]);
                        }}
                        className="px-4 py-3 cursor-pointer hover:bg-purple-600/20 transition-colors"
                      >
                        <span className="font-semibold">{stock.symbol}</span>
                        <span className="text-gray-400 ml-2 text-sm">
                          {stock.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Timeframe Selector */}
              <Select value={timeFrame} onValueChange={setTimeFrame}>
                <SelectTrigger className="w-full lg:w-[180px] h-14 bg-white/10 border border-white/10 text-white rounded-2xl hover:border-purple-500 transition-all">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border border-white/10 text-white">
                  <SelectItem value="1w">1 Week</SelectItem>
                  <SelectItem value="1m">1 Month</SelectItem>
                  <SelectItem value="3m">3 Months</SelectItem>
                  <SelectItem value="6m">6 Months</SelectItem>
                  <SelectItem value="1y">1 Year</SelectItem>
                  <SelectItem value="2y">2 Years</SelectItem>
                  <SelectItem value="5y">5 Years</SelectItem>
                </SelectContent>
              </Select>

              {/* Predict Button */}
              <Button
                onClick={handlePrediction}
                disabled={loadingPrediction}
                className="w-full lg:w-auto px-8 h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/40"
              >
                {loadingPrediction ? "Analyzing..." : "Predict Now"}
              </Button>
            </div>
          </div>

          {/* Prediction Results */}
          <div className="w-full max-w-6xl mt-16">
            {loadingPrediction ? (
              <div className="flex justify-center items-center h-40">
                <Oval color="#A855F7" height={70} width={70} />
              </div>
            ) : (
              <div className="transition-all duration-500 animate-fade-in">
                <PredictionResults stockData={predictionData} />
              </div>
            )}
          </div>
        </section>

        {/* Animation start */}

        {/* ============================= */}
        {/* MARKET DASHBOARD SECTION */}
        {/* ============================= */}

        <section className="relative w-full bg-gradient-to-br from-black via-gray-950 to-gray-900 text-white py-16 px-4 overflow-hidden">
          {/* Animated Chart Background */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg
              viewBox="0 0 500 200"
              className="w-full h-full animate-pulse"
              preserveAspectRatio="none"
            >
              <polyline
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="3"
                points="0,150 50,120 100,140 150,80 200,100 250,60 300,90 350,40 400,70 450,30 500,50"
              />
            </svg>
          </div>

          {/* ============================= */}
          {/* LIVE MARKET TICKER */}
          {/* ============================= */}
          <div className="overflow-hidden whitespace-nowrap bg-gradient-to-r from-purple-900/30 via-gray-900 to-blue-900/30 py-3 border-y border-white/10 mb-12">
            <div className="animate-marquee inline-block text-sm font-medium">
              📈 AAPL +1.24% &nbsp;&nbsp; 📉 TSLA -0.85% &nbsp;&nbsp; 📈 NVDA
              +2.13% &nbsp;&nbsp; 📈 RELIANCE +0.42% &nbsp;&nbsp; 📉 META -1.10%
              &nbsp;&nbsp; 📈 NIFTY50 +0.33%
            </div>
          </div>

          <div className="max-w-7xl mx-auto space-y-20 relative z-10">
            {/* ============================= */}
            {/* FEATURED STOCKS */}
            {/* ============================= */}
            <div>
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-bold tracking-wide">
                    📊 Featured Stocks
                  </h2>

                  {/* LIVE Badge */}
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-green-400 text-sm font-semibold">
                      LIVE
                    </span>
                  </div>
                </div>
              </div>

              {loadingFeatured ? (
                <div className="flex justify-center items-center h-40">
                  <Oval color="#8B5CF6" height={70} width={70} />
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredStocks.map((stock, index) => (
                    <div
                      key={index}
                      className="transform transition-all duration-300 hover:-translate-y-3 hover:shadow-purple-500/20 hover:shadow-2xl"
                    >
                      <StockCard {...stock} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ============================= */}
            {/* MARKET NEWS */}
            {/* ============================= */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl font-bold tracking-wide">
                  📰 Market News
                </h2>

                <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full animate-pulse">
                  Breaking
                </span>
              </div>

              {loadingNews ? (
                <div className="flex justify-center items-center h-40">
                  <Oval color="#F59E0B" height={70} width={70} />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {newsItems.map((news, index) => (
                    <div
                      key={index}
                      className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 shadow-xl hover:shadow-purple-500/20 hover:-translate-y-2 transition-all duration-300"
                    >
                      <NewsCard {...news} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Animation end */}
      </div>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
