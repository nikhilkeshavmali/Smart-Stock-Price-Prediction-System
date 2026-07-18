// ProtectedRoute.tsx
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    // agar login nahi hai, toh redirect to login
    return <Navigate to="/login" replace />;
  }

  // agar login hai, toh children page dikhao
  return children;
};

export default ProtectedRoute;
