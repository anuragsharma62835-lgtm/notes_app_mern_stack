const router = require("express").Router();
const adminProtect = require("../middlewares/adminprotect");
const { adminLogin } = require("../controller/adminauthcontroller");
const {
  getAllUsers,
  getAllNotes,
  deleteUser,
  getAdminStats,
} = require("../controller/admincontroller");

router.post("/login", adminLogin);

router.get("/users", adminProtect, getAllUsers);
router.get("/notes", adminProtect, getAllNotes);
router.delete("/users/:id", adminProtect, deleteUser);
router.get("/stats", adminProtect, getAdminStats);

module.exports = router;
