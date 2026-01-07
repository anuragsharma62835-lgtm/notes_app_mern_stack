import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { AdminAuthProvider } from "./Context/AdminAuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <AdminAuthProvider>
        <App />
    </AdminAuthProvider>
  </AuthProvider>
);
