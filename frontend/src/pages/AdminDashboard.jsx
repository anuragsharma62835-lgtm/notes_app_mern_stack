import { useEffect, useState } from "react";
import API from "../services/api";
import { useAdminAuth } from "../Context/AdminAuthContext";

export default function AdminDashboard() {
  const { admin, logout } = useAdminAuth();
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    const res = await API.get("/admin/stats", {
      headers: { Authorization: `Bearer ${localStorage.getItem("adminToken")}` },
    });
    setStats(res.data);
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!stats) return <p className="p-6">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-600">Admin Dashboard</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-xl">Total Users</h2>
          <p className="text-gray-700 text-2xl">{stats.totalUsers}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-xl">Total Notes</h2>
          <p className="text-gray-700 text-2xl">{stats.totalNotes}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-xl">Most Active Users</h2>
          <ul className="text-gray-700 mt-2">
            {stats.mostActiveUsers.map((u, i) => (
              <li key={i}>{u.name} ({u.notesCount} notes)</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
