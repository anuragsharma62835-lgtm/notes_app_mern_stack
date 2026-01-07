const User = require("../model/user");
const Note = require("../model/notes");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalNotes = await Note.countDocuments();

    const mostActiveUsers = await Note.aggregate([
      { $group: { _id: "$user", notesCount: { $sum: 1 } } },
      { $sort: { notesCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      { $unwind: "$userDetails" },
      { $project: { _id: 0, email: "$userDetails.email", name: "$userDetails.name", notesCount: 1 } }
    ]);

    res.json({ totalUsers, totalNotes, mostActiveUsers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().populate("user", "email name");
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await Note.deleteMany({ user: req.params.id });
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalNotes = await Note.countDocuments();

    const mostActiveUsers = await Note.aggregate([
      {
        $group: {
          _id: "$user",
          notesCount: { $sum: 1 }
        }
      },
      { $sort: { notesCount: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 0,
          name: "$user.name",
          email: "$user.email",
          notesCount: 1
        }
      }
    ]);

    res.json({
      totalUsers,
      totalNotes,
      mostActiveUsers
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admin stats" });
  }
};