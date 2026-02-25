import axios from "axios";

const apiBaseUrl = "https://notes-app-mern-stack-1.onrender.com/api";

const AdminAPI = axios.create({
  baseURL: `${apiBaseUrl}/admin`,
});

AdminAPI.interceptors.request.use((req) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default AdminAPI;