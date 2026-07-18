import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Twitter,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const TICKER_ITEMS = [
  { symbol: "AAPL", change: 1.24 },
  { symbol: "TSLA", change: -0.85 },
  { symbol: "NVDA", change: 2.13 },
  { symbol: "RELIANCE", change: 0.42 },
  { symbol: "META", change: -1.1 },
  { symbol: "NIFTY 50", change: 0.33 },
];

const Footer = () => {
  const feed = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <footer className="relative bg-[#0a0d12] border-t border-[#1f2530] text-[#e6e9ef] mt-24">
      {/* Faint static price-line motif */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <svg
          viewBox="0 0 500 200"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <polyline
            fill="none"
            stroke="#16c784"
            strokeWidth="2"
            points="0,150 50,120 100,140 150,80 200,100 250,60 300,90 350,40 400,70 450,30 500,50"
          />
        </svg>
      </div>

      {/* Main footer content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5">
            <TrendingUp className="text-[#c9a227]" size={22} />
            <h2 className="text-lg font-semibold text-[#e6e9ef]">
              Smart Stock Predictor
            </h2>
          </div>
          <p className="text-[#8b93a3] mt-4 text-sm leading-relaxed">
            AI-powered stock forecasting with real historical data, transparent
            model reasoning, and candlestick-level detail.
          </p>
        </div>

        {/* Markets + Quick Links */}
        <div className="md:col-span-2 flex flex-col md:flex-row justify-between gap-12 md:gap-24">
          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-[#6b7686] mb-5">
              Markets
            </h3>
            <ul className="space-y-3 text-sm">
              {["NIFTY 50", "SENSEX", "NASDAQ", "S&P 500"].map((market) => (
                <li
                  key={market}
                  className="text-[#8b93a3] hover:text-[#16c784] cursor-pointer transition-colors"
                >
                  {market}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-left md:text-right">
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-[#6b7686] mb-5">
              Quick links
            </h3>
            <ul className="space-y-3 text-sm">
              {["Home", "AI Prediction", "Market News", "Featured Stocks"].map(
                (link) => (
                  <li key={link}>
                    <Link
                      to={
                        link === "Home"
                          ? "/"
                          : `/${link.toLowerCase().replace(/\s+/g, "-")}`
                      }
                      className="text-[#8b93a3] hover:text-[#c9a227] transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="font-mono text-[11px] uppercase tracking-widest text-[#6b7686] mb-5">
            Connect
          </h3>
          <div className="flex gap-3">
            <a
              href="https://github.com/nikhilkeshavmali/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#12161f] border border-[#1f2530] p-2.5 rounded-md hover:border-[#c9a227] hover:text-[#c9a227] transition-colors"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/nikhilkeshavmali/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#12161f] border border-[#1f2530] p-2.5 rounded-md hover:border-[#16c784] hover:text-[#16c784] transition-colors"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="#"
              className="bg-[#12161f] border border-[#1f2530] p-2.5 rounded-md hover:border-[#8b93a3] hover:text-[#e6e9ef] transition-colors"
            >
              <Twitter size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Scrolling ticker strip */}
      <div className="relative overflow-hidden border-y border-[#1f2530] bg-[#0d1117]">
        <div className="flex w-max animate-[footer-ticker_32s_linear_infinite] gap-8 py-2.5 px-4">
          {feed.map((t, i) => {
            const up = t.change >= 0;
            return (
              <div
                key={i}
                className="flex items-center gap-1.5 whitespace-nowrap font-mono text-xs"
              >
                <span className="text-[#8b93a3]">{t.symbol}</span>
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
      </div>

      {/* Bottom */}
      <div className="text-center py-6 text-[#6b7686] text-xs font-mono">
        © {new Date().getFullYear()} Smart Stock Predictor. Built with AI &
        Financial Intelligence.
      </div>

      <style>{`
        @keyframes footer-ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
