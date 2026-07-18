import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import HeroSection from "../components/ui/HeroSection";

const tickerData = [
  { symbol: "AAPL", price: "231.42", change: "+1.24%", up: true },
  { symbol: "TSLA", price: "412.09", change: "-0.87%", up: false },
  { symbol: "NVDA", price: "138.76", change: "+3.02%", up: true },
  { symbol: "MSFT", price: "467.21", change: "+0.45%", up: true },
  { symbol: "AMZN", price: "212.88", change: "-1.15%", up: false },
  { symbol: "GOOGL", price: "196.33", change: "+0.62%", up: true },
  { symbol: "META", price: "584.10", change: "+2.11%", up: true },
  { symbol: "AMD", price: "162.55", change: "-0.34%", up: false },
];

const Sparkline = ({ up }) => (
  <svg viewBox="0 0 100 32" className="w-full h-8" preserveAspectRatio="none">
    <polyline
      points={
        up
          ? "0,28 15,24 30,25 45,18 60,20 75,10 90,12 100,4"
          : "0,6 15,10 30,8 45,14 60,12 75,20 90,18 100,26"
      }
      fill="none"
      stroke={up ? "#16C784" : "#EA3943"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Reusable floating glow orb
const GlowOrb = ({ className, color }) => (
  <div
    className={`absolute rounded-full blur-3xl pointer-events-none animate-float ${className}`}
    style={{ background: color }}
  />
);

const Index = () => {
  return (
    <div className="min-h-screen bg-[#050816] text-white font-[Inter,sans-serif] relative overflow-hidden">
      {/* ================= AMBIENT BACKGROUND ================= */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <GlowOrb className="w-[420px] h-[420px] -top-40 -left-40 opacity-20" color="#3861FB" />
        <GlowOrb className="w-[360px] h-[360px] top-[40%] -right-32 opacity-[0.15]" color="#16C784" />
      </div>

      {/* ================= TICKER TAPE ================= */}
      <div className="relative w-full bg-white/[0.02] backdrop-blur-md border-b border-white/[0.08] overflow-hidden py-2.5">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...tickerData, ...tickerData, ...tickerData].map((t, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-6 font-[JetBrains_Mono,monospace] text-sm"
            >
              <span className="font-semibold text-white">{t.symbol}</span>
              <span className="text-gray-500">{t.price}</span>
              <span className={t.up ? "text-[#16C784]" : "text-[#EA3943]"}>
                {t.up ? "▲" : "▼"} {t.change}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ================= HERO SECTION ================= */}
      <HeroSection />

      {/* ================= WHAT WE PROVIDE ================= */}
      <section className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="mb-16 max-w-2xl animate-reveal">
          <span className="font-[JetBrains_Mono,monospace] text-xs tracking-widest text-[#3861FB] uppercase">
            Platform Modules
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 font-[Space_Grotesk,sans-serif]">
            What We Provide
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              title: "AI Stock Prediction",
              badge: "LIVE",
              badgeColor: "#16C784",
              up: true,
              desc: "Machine learning models analyze historical data to forecast price movements with confidence-scored insights.",
            },
            {
              title: "Chart Analysis",
              badge: "LIVE",
              badgeColor: "#EA3943",
              up: false,
              desc: "Automatic detection of trends, support/resistance levels, and recurring market patterns.",
            },
            {
              title: "Market Intelligence",
              badge: "LIVE",
              badgeColor: "#16C784",
              up: true,
              desc: "Real-time financial news and sentiment scoring to keep you ahead of market-moving events.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="group relative bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#3861FB]/40 hover:shadow-[0_0_40px_-10px_rgba(56,97,251,0.4)]"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold font-[Space_Grotesk,sans-serif]">
                  {f.title}
                </h3>
                <span
                  className="font-[JetBrains_Mono,monospace] text-xs flex items-center gap-1.5"
                  style={{ color: f.badgeColor }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: f.badgeColor }}
                  />
                  {f.badge}
                </span>
              </div>
              <Sparkline up={f.up} />
              <p className="text-gray-400 text-sm mt-5 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="relative border-y border-white/[0.08] bg-white/[0.015] py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16 max-w-2xl">
            <span className="font-[JetBrains_Mono,monospace] text-xs tracking-widest text-[#3861FB] uppercase">
              Workflow
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-3 font-[Space_Grotesk,sans-serif]">
              How It Works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-6 left-[16.6%] right-[16.6%] h-px bg-gradient-to-r from-transparent via-white/[0.15] to-transparent" />

            {[
              { n: "01", title: "Select a Stock", desc: "Enter the stock symbol you want to analyze." },
              { n: "02", title: "AI Analysis", desc: "Our model processes historical and trend data." },
              { n: "03", title: "Get Insights", desc: "Receive prediction results with visual analytics." },
            ].map((step, i) => (
              <div
                key={i}
                className="relative px-4 text-center md:text-left group"
              >
                <div className="relative z-10 inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#050816] border border-[#3861FB]/50 text-[#3861FB] font-[JetBrains_Mono,monospace] font-bold mb-5 transition-all duration-300 group-hover:border-[#3861FB] group-hover:shadow-[0_0_20px_-4px_rgba(56,97,251,0.6)] group-hover:scale-110">
                  {step.n}
                </div>
                <h3 className="text-xl font-semibold mb-2 font-[Space_Grotesk,sans-serif]">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="relative max-w-6xl mx-auto px-6 py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-[Space_Grotesk,sans-serif]">
          Why Choose{" "}
          <span className="bg-gradient-to-r from-[#3861FB] to-[#16C784] bg-clip-text text-transparent">
            Smart Stock Predictor
          </span>
          ?
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed mb-12">
          We combine artificial intelligence, financial data science, and
          real-time analytics to deliver institutional-grade insights in a
          clean, focused interface.
        </p>

        <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-14 font-[JetBrains_Mono,monospace] bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl py-8">
          <div className="border-r border-white/[0.08]">
            <div className="text-2xl md:text-3xl font-bold text-[#3861FB]">10K+</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Predictions Run</div>
          </div>
          <div className="border-r border-white/[0.08]">
            <div className="text-2xl md:text-3xl font-bold text-[#16C784]">24/7</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Market Coverage</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-bold text-white">&lt;1s</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Response Time</div>
          </div>
        </div>

        <Link to="/prediction">
          <Button className="relative px-10 py-6 text-base font-semibold bg-gradient-to-r from-[#3861FB] to-[#2f4fd6] text-white rounded-xl shadow-lg shadow-[#3861FB]/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_35px_-5px_rgba(56,97,251,0.6)]">
            Get Started Now
          </Button>
        </Link>
      </section>

      {/* ================= FOOTER & CHAT ================= */}
      <Footer />
      <ChatWidget />

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        .animate-ticker {
          animation: ticker 30s linear infinite;
          width: max-content;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
        .animate-float {
          animation: float 12s ease-in-out infinite;
        }

        @keyframes reveal {
          0% { opacity: 0; transform: translateY(14px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal {
          animation: reveal 0.7s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Index;