const rateLimit = require("express-rate-limit");

exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50, 
  message: { message: "Too many login attempts. Try again after 15 minutes." },
});
