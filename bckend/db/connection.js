const mongoose = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb Atlas Connected");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    throw err;
  }
};

module.exports = connection;
