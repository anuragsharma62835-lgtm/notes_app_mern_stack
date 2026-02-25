import { useEffect, useState } from "react";
import AdminAPI from "../../services/adminapi";
import { toast } from "react-toastify";

export default function AdminNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const res = await AdminAPI.get("/notes");
      setNotes(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadNotes = async () => {
      await fetchNotes();
    };
    loadNotes();
  }, []);

  if (loading) return <p className="p-6">Loading notes...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-indigo-600">All Notes</h1>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Content</th>
              <th className="p-3 border">User</th>
              <th className="p-3 border">Email</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note._id} className="hover:bg-gray-50">
                <td className="p-3 border font-medium">{note.title}</td>
                <td className="p-3 border text-sm text-gray-600">
                  {note.content}
                </td>
                <td className="p-3 border">{note.user?.name}</td>
                <td className="p-3 border">{note.user?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
