import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Menu, X, BarChart3, MessageCircle, User } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("username");
    setUsername(user);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const linkClasses = (isActive: boolean) =>
    `font-mono text-sm uppercase tracking-widest transition-colors duration-200 ${
      isActive ? "text-[#c9a227]" : "text-[#8b93a3] hover:text-[#e6e9ef]"
    }`;

  return (
    <nav className="bg-[#0a0d12]/95 backdrop-blur-md border-b border-[#1f2530] fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 text-[#e6e9ef] font-semibold text-xl">
          <BarChart3 className="w-5 h-5 text-[#c9a227]" />
          SmartStock AI
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6">
            <NavLink to="/" className={({ isActive }) => linkClasses(isActive)}>
              Home
            </NavLink>
            <NavLink
              to="/prediction"
              className={({ isActive }) => linkClasses(isActive)}
            >
              Prediction
            </NavLink>
            <NavLink
              to="/featured"
              className={({ isActive }) => linkClasses(isActive)}
            >
              Featured
            </NavLink>
            <NavLink
              to="/news"
              className={({ isActive }) => linkClasses(isActive)}
            >
              News
            </NavLink>
          </div>

          <NavLink
            to="/feedback"
            className={({ isActive }) =>
              `flex items-center gap-1.5 ${linkClasses(isActive)}`
            }
          >
            <MessageCircle className="w-4 h-4" />
            Feedback
          </NavLink>

          {username && (
            <div className="flex items-center gap-4 ml-6 pl-6 border-l border-[#1f2530]">
              <span className="flex items-center gap-1.5 text-[#8b93a3] font-mono text-sm">
                <User className="w-4 h-4 text-[#c9a227]" />
                {username}
              </span>
              <Button
                onClick={handleLogout}
                className="h-9 px-4 font-mono text-xs font-semibold rounded-md bg-[#16c784] hover:bg-[#13b378] text-[#0a0d12] flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden text-[#e6e9ef]">
          {isOpen ? (
            <X
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 cursor-pointer"
            />
          ) : (
            <Menu
              onClick={() => setIsOpen(true)}
              className="w-6 h-6 cursor-pointer"
            />
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#0a0d12] border-t border-[#1f2530] px-6 py-4 space-y-4">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => linkClasses(isActive)}
          >
            Home
          </NavLink>
          <NavLink
            to="/prediction"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `block ${linkClasses(isActive)}`}
          >
            Prediction
          </NavLink>
          <NavLink
            to="/featured"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `block ${linkClasses(isActive)}`}
          >
            Featured
          </NavLink>
          <NavLink
            to="/news"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `block ${linkClasses(isActive)}`}
          >
            News
          </NavLink>
          <NavLink
            to="/feedback"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-1.5 ${linkClasses(isActive)}`
            }
          >
            <MessageCircle className="w-4 h-4" />
            Feedback
          </NavLink>

          {username && (
            <div className="pt-4 border-t border-[#1f2530] flex flex-col gap-3">
              <span className="flex items-center gap-1.5 text-[#8b93a3] font-mono text-sm">
                <User className="w-4 h-4 text-[#c9a227]" />
                {username}
              </span>
              <Button
                onClick={handleLogout}
                className="w-full h-9 font-mono text-xs font-semibold rounded-md bg-[#16c784] hover:bg-[#13b378] text-[#0a0d12] transition-colors"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
