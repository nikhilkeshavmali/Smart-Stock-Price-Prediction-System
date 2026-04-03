import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Success 🎉",
          description: "Account created successfully",
        });
        navigate("/");
      } else {
        toast({
          title: "Error",
          description: data.message || "Registration failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Server Error",
        description: "Unable to connect to server",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6">
      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10 text-white transition-all duration-500 hover:scale-[1.02]">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Create Account</h2>
          <p className="text-sm opacity-80 mt-2">
            Join us and start your journey 🚀
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-5">
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

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Create a password"
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

          {/* Confirm Password */}
          <div>
            <Label htmlFor="confirmPassword" className="text-white">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 bg-white/20 border-none text-white placeholder:text-white/70 focus:ring-2 focus:ring-white"
            />
          </div>

          {/* Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-white text-black hover:bg-gray-200 transition-all duration-300 font-semibold"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>

          {/* Redirect */}
          <p className="text-center text-sm mt-4 opacity-80">
            Already have an account?{" "}
            <Link
              to="/"
              className="underline font-semibold hover:text-gray-200"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
