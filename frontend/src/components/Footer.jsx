export default function Footer() {
  return (
    <footer className="bg-indigo-600 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-center md:text-left">
          &copy; 2026 NotesApp. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:text-gray-200 transition">
            About
          </a>
          <a href="#" className="hover:text-gray-200 transition">
            Contact
          </a>
          <a href="#" className="hover:text-gray-200 transition">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
