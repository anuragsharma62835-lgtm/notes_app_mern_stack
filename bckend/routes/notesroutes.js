const router = require("express").Router();
const protect = require("../middlewares/authmiddleware");
const {
  createNote,
  getMyNotes,
  updateNote,
  deleteNote,
} = require("../controller/notescontroller");


router.post("/", protect,createNote);
router.get("/",protect, getMyNotes);
router.put("/:id", protect,updateNote);
router.delete("/:id", protect,deleteNote);

module.exports = router;
