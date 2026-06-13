import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { isTokenExpired } from "@/utils/auth";

export default function RoleProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  // No user in context
  if (!user || !token) {
    return <Navigate to="/" replace />;
  }

  // Catches token expiring while tab is left open
  if (isTokenExpired(token)) {
    logout();
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
