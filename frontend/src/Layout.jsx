import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./pages/admin/AdminSidebar";
import { useAdminAuth } from "./Context/AdminAuthContext";

function Layout() {
  const location = useLocation();
  const { admin } = useAdminAuth(); 
  const isAdminLogin = location.pathname === "/admin/login";
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
   <div className="min-h-screen bg-gray-100">
      {!isAdminRoute && <Navbar />}

      {isAdminRoute && admin && !isAdminLogin ? (
        <div className="flex min-h-screen">
          <AdminSidebar /> 
          <main className="flex-1 p-6 overflow-y-auto">
            <Outlet />
          </main>
        </div>
      ) : (
        <main className="flex-grow">
          <Outlet />
        </main>
      )}

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default Layout;
