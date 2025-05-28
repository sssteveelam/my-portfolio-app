// server/controllers/authController.js
const User = require("../models/User"); // Import model User
const bcrypt = require("bcryptjs"); // Để so sánh mật khẩu
const jwt = require("jsonwebtoken"); // Để tạo và xác thực token JWT

// Hàm tạo JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN, // Thời gian hết hạn của token
  });
};

// @desc    Đăng ký người dùng mới (chỉ dùng lần đầu để tạo tài khoản admin)
// @route   POST /api/auth/register
// @access  Public (Sau này nên hạn chế, chỉ cho phép tạo admin một lần)
exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email }); // Tìm xem email đã tồn tại chưa

    if (user) {
      return res
        .status(400)
        .json({ msg: "Người dùng với email này đã tồn tại" });
    }

    // Tạo người dùng mới
    user = new User({
      username,
      email,
      password, // Mật khẩu sẽ tự động được mã hóa nhờ middleware 'pre save' trong User model
      role: "admin", // Mặc định tài khoản đăng ký đầu tiên là admin
    });

    await user.save(); // Lưu người dùng vào DB

    // Tạo và gửi JWT token
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: token,
    });
  } catch (err) {
    console.error(err.message);
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({ msg: messages.join(", ") });
    }
    res.status(500).send("Lỗi máy chủ");
  }
};

// @desc    Đăng nhập người dùng
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }); // Tìm người dùng theo email

    if (!user) {
      return res.status(400).json({ msg: "Thông tin đăng nhập không hợp lệ" });
    }

    // So sánh mật khẩu đã nhập với mật khẩu đã mã hóa trong DB
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Thông tin đăng nhập không hợp lệ" });
    }

    // Tạo và gửi JWT token
    const token = generateToken(user._id);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Lỗi máy chủ");
  }
};

// @desc    Lấy thông tin người dùng đang đăng nhập (dùng token)
// @route   GET /api/auth/me
// @access  Private (Chỉ người dùng đã đăng nhập mới được truy cập)
exports.getMe = async (req, res) => {
  // req.user sẽ được thêm vào bởi middleware xác thực (mình sẽ tạo sau)
  try {
    const user = await User.findById(req.user.id).select("-password"); // Trả về thông tin người dùng trừ mật khẩu
    if (!user) {
      return res.status(404).json({ msg: "Người dùng không tồn tại" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Lỗi máy chủ");
  }
};
