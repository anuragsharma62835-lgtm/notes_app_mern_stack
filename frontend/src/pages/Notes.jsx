import { useEffect, useState } from "react";
import API from "../services/api";
import NoteCard from "../components/notescard";
import { toast } from "react-toastify";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchNotes = async () => {
    try {
      const res = await API.get("/notes");
      setNotes(res.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAdd = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    try {
      setSubmitting(true);
      await API.post("/notes", { title, content });
      setTitle("");
      setContent("");
      toast.success("Note added");
      fetchNotes();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add note");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (note) => {
    setEditId(note._id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content are required");
      return;
    }

    try {
      setSubmitting(true);
      await API.put(`/notes/${editId}`, { title, content });
      setEditId(null);
      setTitle("");
      setContent("");
      toast.success("Note updated");
      fetchNotes();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update note");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/notes/${id}`);
      toast.success("Note deleted");
      fetchNotes();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete note");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">
        Your Notes
      </h1>

      {/* Add / Edit */}
      <div className="mb-6 bg-white p-4 rounded shadow-md flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Title"
          className="flex-1 border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Content"
          className="flex-1 border p-2 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {editId ? (
          <button
            onClick={handleUpdate}
            disabled={submitting}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {submitting ? "Updating..." : "Update Note"}
          </button>
        ) : (
          <button
            onClick={handleAdd}
            disabled={submitting}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            {submitting ? "Adding..." : "Add Note"}
          </button>
        )}
      </div>

      {/* Loading */}
      {loading ? (
        <p>Loading notes...</p>
      ) : notes.length === 0 ? (
        <p className="text-gray-500 text-center">
          No notes found. Add your first note 
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
}