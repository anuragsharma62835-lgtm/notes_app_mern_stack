import { NavLink, useNavigate } from "react-router-dom";
import { FaUsers, FaStickyNote, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { useAdminAuth } from "../../Context/AdminAuthContext";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const { logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded transition ${
      isActive
        ? "bg-indigo-600 text-white"
        : "text-gray-700 hover:bg-indigo-100"
    }`;

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-4">
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">
        Admin Panel
      </h2>

      <nav className="flex flex-col gap-2">
        <NavLink to="/admin/dashboard" className={linkClass}>
          <FaChartBar /> Dashboard
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          <FaUsers /> Users
        </NavLink>

        <NavLink to="/admin/notes" className={linkClass}>
          <FaStickyNote /> Notes
        </NavLink>
      </nav>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 mt-10 text-red-600 hover:bg-red-100 px-4 py-2 rounded w-full"
      >
        <FaSignOutAlt /> Logout
      </button>
    </aside>
  );
}
