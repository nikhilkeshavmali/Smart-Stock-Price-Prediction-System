import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Eye, EyeOff } from "lucide-react";
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
      const response = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 text-white transition-all duration-500 hover:scale-[1.02]">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Welcome Back 👋</h2>
          <p className="text-sm opacity-80 mt-2">Sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username */}
          <div>
            <Label htmlFor="username" className="text-white">
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-1 bg-white/20 border-none text-white placeholder:text-white/70 focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 bg-white/20 border-none text-white placeholder:text-white/70 pr-10 focus:ring-2 focus:ring-white"
            />
            <div
              className="absolute right-3 top-[38px] cursor-pointer text-white/80 hover:text-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-center text-sm text-red-300 bg-red-500/20 p-2 rounded-md">
              {error}
            </p>
          )}

          {/* Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-white text-black hover:bg-gray-200 transition-all duration-300 font-semibold"
          >
            <LogIn className="mr-2 h-4 w-4" />
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

          {/* Redirect */}
          <p className="text-center text-sm mt-4 opacity-80">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="underline font-semibold hover:text-gray-200"
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
