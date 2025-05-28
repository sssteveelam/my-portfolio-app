// server/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controllers/authController"); // Import các hàm từ controller
const { protect } = require("../middleware/authMiddleware"); // Import middleware protect

// Tuyến đường PUBLIC (ai cũng có thể đăng ký/đăng nhập)
router.post("/register", registerUser); // POST /api/auth/register để đăng ký
router.post("/login", loginUser); // POST /api/auth/login để đăng nhập

// Tuyến đường PRIVATE (chỉ người đã đăng nhập mới được truy cập)
router.get("/me", protect, getMe); // GET /api/auth/me để lấy thông tin người dùng đang đăng nhập

module.exports = router;
