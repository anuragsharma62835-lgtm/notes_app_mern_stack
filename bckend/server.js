const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { loginLimiter } = require("./middlewares/rateLimit");
const connection = require("./db/connection");
require("dotenv").config();

connection();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", loginLimiter, require("./routes/Authroutes"));
app.use("/api/notes", require("./routes/notesroutes"));
app.use("/api/admin", loginLimiter, require("./routes/adminroutes"));

app.listen(5000, () => {
  console.log("Server running on 5000");
});
