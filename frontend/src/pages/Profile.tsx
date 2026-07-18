import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, User, Mail, UserCircle, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface UserType {
  username: string;
  email: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("access_token");

      // If no token -> redirect immediately
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/api/profile/", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Unauthorized");
        }

        const data = await response.json();

        setUser({
          username: data.username,
          email: data.email,
        });
      } catch (err) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        toast.error("Session expired. Please login again.");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate("/", { replace: true });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0d12]">
        <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#232936] border-t-[#c9a227]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0d12] text-[#ea3943] font-mono text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0d12] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Terminal grid background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      <div className="relative z-10 w-full max-w-2xl bg-[#12161f] border border-[#1f2530] rounded-xl shadow-2xl p-10">
        {/* Profile header */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 rounded-full bg-[#1a2029] border border-[#232936] flex items-center justify-center">
            <UserCircle className="w-11 h-11 text-[#c9a227]" />
          </div>
          <h1 className="text-2xl font-semibold text-[#e6e9ef] mt-4">
            {user?.username || "User"}
          </h1>
          <p className="font-mono text-xs text-[#6b7686] mt-1">
            {user?.email || "No email found"}
          </p>
        </div>

        {/* Info rows */}
        <div className="space-y-3">
          <div className="flex items-center gap-4 bg-[#0a0d12] border border-[#1f2530] p-4 rounded-lg">
            <User className="w-5 h-5 text-[#c9a227]" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#6b7686]">
                Username
              </p>
              <p className="text-[#e6e9ef] font-medium mt-0.5">
                {user?.username}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#0a0d12] border border-[#1f2530] p-4 rounded-lg">
            <Mail className="w-5 h-5 text-[#c9a227]" />
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#6b7686]">
                Email
              </p>
              <p className="text-[#e6e9ef] font-medium mt-0.5">
                {user?.email || "Not available"}
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-3 mt-10">
          <Link to="/home" className="w-full">
            <Button className="w-full h-11 font-mono text-sm bg-[#1a2029] hover:bg-[#232936] border border-[#232936] text-[#e6e9ef]">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to home
            </Button>
          </Link>

          <Button
            onClick={handleLogout}
            className="w-full h-11 font-mono text-sm bg-transparent border border-[#ea3943]/40 text-[#ea3943] hover:bg-[#ea3943]/10"
          >
            <LogOut className="mr-2 w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
