const router = require("express").Router();
const { register, login, getProfile } = require("../controller/AuthController");
const protect = require("../middlewares/authmiddleware");

router.post("/register", register);
router.post("/login", login);
router.get('/profile',protect,getProfile)

module.exports = router;
