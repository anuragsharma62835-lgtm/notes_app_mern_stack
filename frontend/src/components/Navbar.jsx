import { useAuth } from "../Context/AuthContext";
import { useAdminAuth } from "../Context/AdminAuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { admin } = useAdminAuth();

  return (
    <nav className="p-4 bg-indigo-600 text-white flex justify-between">
      <Link to="/">
        <h1 className="font-bold">NotesApp</h1>
      </Link>
      <div>
        {user ? (
          <>
            <div>
              <button onClick={logout}>Logout</button>
            </div>
          </>
        ) : admin ? (
          <span>Admin: {admin.email}</span>
        ) : (
          <span>Guest</span>
        )}
      </div>
    </nav>
  );
}
