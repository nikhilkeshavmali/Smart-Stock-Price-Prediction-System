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

      // ✅ If no token → redirect immediately
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
        navigate("/login"); // ✅ Redirect properly
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear(); // ✅ better than removing one by one
    toast.success("Logged out successfully");
    navigate("/login", { replace: true }); // ✅ prevents back button issue
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-10 text-white">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-10">
          <UserCircle className="w-28 h-28 text-white drop-shadow-lg" />
          <h1 className="text-4xl font-bold mt-4">
            {user?.username || "User"}
          </h1>
          <p className="text-sm opacity-80 mt-1">
            {user?.email || "No Email Found"}
          </p>
        </div>

        {/* Info Cards */}
        <div className="space-y-6">
          <div className="flex items-center gap-5 bg-white/20 p-5 rounded-2xl">
            <User className="w-6 h-6" />
            <div>
              <p className="text-sm opacity-80">Username</p>
              <p className="text-lg font-semibold">{user?.username}</p>
            </div>
          </div>

          <div className="flex items-center gap-5 bg-white/20 p-5 rounded-2xl">
            <Mail className="w-6 h-6" />
            <div>
              <p className="text-sm opacity-80">Email</p>
              <p className="text-lg font-semibold">
                {user?.email || "Not Available"}
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-10">
          <Link to="/home" className="w-full">
            <Button className="w-full bg-white text-black hover:bg-gray-200">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Button>
          </Link>

          <Button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600"
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
