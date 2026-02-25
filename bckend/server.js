const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connection = require("./db/connection");
const { loginLimiter } = require("./middlewares/rateLimit");
// Routes
const authRoutes = require("./routes/Authroutes");
const notesRoutes = require("./routes/notesroutes");
const adminRoutes = require("./routes/adminroutes");
const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: CLIENT_ORIGIN, credentials: true }));
app.use(express.json());
app.disable("x-powered-by");
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
  });
});
app.use("/api/auth", loginLimiter, authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/admin", loginLimiter, adminRoutes);
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});
const start = async () => {
  try {
    await connection();
    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};
start();