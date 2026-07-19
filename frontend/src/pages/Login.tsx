import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Eye, EyeOff, BarChart3 } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        localStorage.setItem("username", username);

        navigate("/home");
      } else {
        setError(data.message || "Invalid username or password");
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0d12] p-6 relative overflow-hidden">
      {/* Terminal grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative z-10 w-full max-w-md bg-[#12161f] border border-[#1f2530] rounded-xl shadow-2xl p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-11 h-11 rounded-md bg-[#1a2029] border border-[#232936] flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-5 h-5 text-[#c9a227]" />
          </div>
          <h2 className="text-2xl font-semibold text-[#e6e9ef] tracking-tight">
            Sign in to your account
          </h2>
          <p className="font-mono text-xs text-[#6b7686] mt-2 uppercase tracking-widest">
            Authenticate to continue
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username */}
          <div>
            <Label
              htmlFor="username"
              className="font-mono text-[11px] uppercase tracking-widest text-[#6b7686]"
            >
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-2 h-11 bg-[#0a0d12] border border-[#232936] text-[#e6e9ef] placeholder:text-[#4b5566] focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/40 rounded-md"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Label
              htmlFor="password"
              className="font-mono text-[11px] uppercase tracking-widest text-[#6b7686]"
            >
              Password
            </Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-2 h-11 bg-[#0a0d12] border border-[#232936] text-[#e6e9ef] placeholder:text-[#4b5566] pr-10 focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/40 rounded-md"
            />
            <div
              className="absolute right-3 top-[42px] cursor-pointer text-[#6b7686] hover:text-[#c9a227] transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-center text-sm text-[#ea3943] bg-[#ea3943]/10 border border-[#ea3943]/30 p-2.5 rounded-md font-mono">
              {error}
            </p>
          )}

          {/* Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 mt-2 font-mono text-sm font-semibold rounded-md bg-[#16c784] hover:bg-[#13b378] text-[#0a0d12] transition-colors disabled:opacity-50"
          >
            <LogIn className="mr-2 h-4 w-4" />
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>

          {/* Redirect */}
          <p className="text-center text-sm mt-4 text-[#6b7686]">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#c9a227] hover:text-[#dab74a] font-semibold transition-colors"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
