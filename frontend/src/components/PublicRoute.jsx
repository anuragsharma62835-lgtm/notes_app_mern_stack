import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

export default function PublicRoute({ children }) {
  const { user } = useAuth();

  // If user already logged in → go to notes
  return user ? <Navigate to="/notes" replace /> : children;
}