import { Link } from "react-router-dom";
import { Home } from "lucide-react";

export default function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
      
      {/* 404 Text */}
      <h1 className="text-7xl font-extrabold text-indigo-600 mb-4">
        404
      </h1>

      <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>

      <p className="text-gray-600 mb-6 max-w-md">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>

      {/* Home Button */}
      <Link
        to="/"
        className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700 transition"
      >
        <Home size={20} />
        Go to Home
      </Link>

    </div>
  );
}