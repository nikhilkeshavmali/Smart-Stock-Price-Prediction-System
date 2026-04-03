import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 text-white mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Smart Stock Predictor
          </h2>
          <p className="text-gray-400 mt-4 text-sm leading-relaxed">
            AI-powered stock forecasting platform providing real-time insights,
            trend analysis and intelligent market predictions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li>
              <Link to="/" className="hover:text-purple-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-purple-400">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-purple-400">
                Predictions
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-purple-400">
                Market News
              </Link>
            </li>
          </ul>
        </div>

        {/* Markets */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Markets</h3>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="hover:text-green-400 cursor-pointer">NIFTY 50</li>
            <li className="hover:text-green-400 cursor-pointer">SENSEX</li>
            <li className="hover:text-green-400 cursor-pointer">NASDAQ</li>
            <li className="hover:text-green-400 cursor-pointer">S&P 500</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <div className="flex gap-4">
            <a
              href="https://github.com/nikhilkeshavmali/"
              className="bg-white/10 p-3 rounded-xl hover:bg-purple-600 transition"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/nikhilkeshavmali/"
              className="bg-white/10 p-3 rounded-xl hover:bg-blue-500 transition"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="#"
              className="bg-white/10 p-3 rounded-xl hover:bg-sky-500 transition"
            >
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-white/10 text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} Smart Stock Predictor. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
