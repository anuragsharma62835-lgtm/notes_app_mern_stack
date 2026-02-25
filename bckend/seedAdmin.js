const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const Admin = require("./model/admin");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo Atlas connected"))
  .catch(err => console.log(err));

const createAdmin = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const admin = new Admin({
    email: "admin@test.com",
    password: hashedPassword,
    createdAt: new Date()
  });

  await admin.save();
  console.log("Admin created successfully!");
  process.exit();
};

createAdmin();
