import { FaTrash, FaEdit } from "react-icons/fa";

export default function NoteCard({ note, onDelete,onEdit }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-indigo-600 mb-2">
        {note.title}
      </h3>

      <p className="text-gray-700 flex-grow">
        {note.content}
      </p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-400">
          {new Date(note.createdAt).toLocaleDateString()}
        </span>

        <div className="flex gap-3">
          <button onClick={()=>onEdit(note)}
            className="text-indigo-600 hover:text-indigo-800 transition"
            title="Edit Note"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => onDelete(note._id)}
            className="text-red-500 hover:text-red-700 transition"
            title="Delete Note"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
