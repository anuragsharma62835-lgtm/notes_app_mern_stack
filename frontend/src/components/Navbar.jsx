import { useAuth } from "../Context/AuthContext";
import { useAdminAuth } from "../Context/AdminAuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { admin, logout: adminLogout } = useAdminAuth();
  const navigate = useNavigate();

  const handleUserLogout = () => {
    logout();
    navigate("/");
  };

  const handleAdminLogout = () => {
    adminLogout();
    navigate("/admin/login");
  };

  return (
    <nav className="p-4 bg-indigo-600 text-white flex justify-between items-center">
      
      {/* Logo */}
      <Link to={user ? "/notes" : "/"}>
        <h1 className="font-bold text-lg">NotesApp</h1>
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-4">

        {user ? (
          <>
            <Link
              to="/profile"
              className="hover:underline"
            >
              Profile
            </Link>

            <button
              onClick={handleUserLogout}
              className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-200"
            >
              Logout
            </button>
          </>
        ) : admin ? (
          <>
            <span className="font-semibold">
              Admin: {admin.email}
            </span>

            <button
              onClick={handleAdminLogout}
              className="bg-white text-indigo-600 px-3 py-1 rounded hover:bg-gray-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>

            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}

      </div>
    </nav>
  );
}