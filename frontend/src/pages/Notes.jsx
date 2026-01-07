import { useEffect, useState } from "react";
import API from "../services/api";
import { useAuth } from "../Context/AuthContext";
import NoteCard from "../components/notescard";

export default function Notes() {
  const { user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchNotes = async () => {
    const res = await API.get("/notes", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAdd = async () => {
    await API.post(
      "/notes",
      { title, content },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    setTitle("");
    setContent("");
    fetchNotes();
  };

  const handleEdit = (note) => {
    setEditId(note._id);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleUpdate = async () => {
    await API.put(
      `/notes/${editId}`,
      { title, content },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    setEditId(null);
    setTitle("");
    setContent("");
    fetchNotes();
  };
  const handleDelete = async (id) => {
    await API.delete(`/notes/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchNotes();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">Your Notes</h1>

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
          className="flex-2 border p-2 rounded"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {editId ? (
          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Update Note
          </button>
        ) : (
          <button
            onClick={handleAdd}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Add Note
          </button>
        )}
      </div>

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
    </div>
  );
}
