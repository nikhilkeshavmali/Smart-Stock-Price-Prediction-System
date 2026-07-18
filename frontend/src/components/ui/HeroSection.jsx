import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-screen overflow-hidden px-6 bg-[#0a0d12]">
      {/* Terminal grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Faint price-line motif */}
      <div className="absolute inset-0 opacity-25">
        <svg
          viewBox="0 0 1440 400"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <polyline
            fill="none"
            stroke="#16c784"
            strokeWidth="2"
            points="0,220 100,200 200,235 300,170 400,190 500,140 600,170 700,120 800,150 900,100 1000,130 1100,90 1200,120 1300,80 1440,110"
          />
          <polyline
            fill="none"
            stroke="#c9a227"
            strokeWidth="1.5"
            points="0,300 100,285 200,310 300,275 400,290 500,255 600,280 700,235 800,260 900,215 1000,240 1100,205 1200,230 1300,195 1440,220"
          />
        </svg>
      </div>

      {/* Hero content */}
      <div className="relative z-10 max-w-3xl flex flex-col items-center">
        <span className="font-mono text-[11px] uppercase tracking-widest text-[#c9a227] mb-4 animate-fade-in">
          AI-driven price forecasting
        </span>

        <h1 className="text-4xl md:text-6xl font-semibold leading-tight text-[#e6e9ef] animate-fade-in">
          See where a stock is headed,
          <br />
          not just where it's been
        </h1>

        <p className="mt-6 text-[#8b93a3] text-lg max-w-xl animate-fade-in delay-200">
          Real candlestick history, a transparent forecasting model, and a
          confidence range you can actually reason about.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-400">
          <Link to="/prediction">
            <Button className="h-12 px-8 font-mono text-sm font-semibold rounded-md bg-[#16c784] hover:bg-[#13b378] text-[#0a0d12] transition-colors">
              Start prediction
            </Button>
          </Link>

          <Link to="/about">
            <Button className="h-12 px-8 font-mono text-sm font-semibold rounded-md bg-transparent border border-[#232936] hover:border-[#c9a227] hover:text-[#c9a227] text-[#e6e9ef] transition-colors">
              Learn more
            </Button>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.9s ease forwards; }
        .animate-fade-in.delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animate-fade-in.delay-400 { animation-delay: 0.4s; opacity: 0; }
      `}</style>
    </section>
  );
};

export default HeroSection;
