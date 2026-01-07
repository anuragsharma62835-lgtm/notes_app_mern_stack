import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-indigo-50 flex flex-col items-center justify-center px-4">
      <h1 className="text-5xl font-bold text-indigo-600 mb-6 text-center">
        Welcome to NotesApp
      </h1>
      <p className="text-gray-700 text-lg mb-8 text-center max-w-xl">
        A full-stack Notes app. Save your notes, manage your profile, and let admin track all activity.
      </p>
      <div className="flex gap-4">
        <Link to="/login" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
          User Login
        </Link>
        <Link to="/register" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition">
          Register
        </Link>
        <Link to="/admin/login" className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
          Admin Login
        </Link>
      </div>
    </div>
  );
}
