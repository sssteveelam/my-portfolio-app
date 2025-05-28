// server/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import model User

// Middleware để bảo vệ các routes yêu cầu xác thực
const protect = async (req, res, next) => {
  let token;

  // Kiểm tra xem token có trong header Authorization không
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Lấy token từ header (dạng: Bearer TOKEN_CỦA_EM)
      token = req.headers.authorization.split(" ")[1];

      // Giải mã token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Tìm người dùng trong DB dựa trên ID từ token và gán vào req.user
      req.user = await User.findById(decoded.id).select("-password"); // Không trả về mật khẩu

      if (!req.user) {
        return res
          .status(401)
          .json({ msg: "Không được ủy quyền, người dùng không tồn tại" });
      }

      next(); // Chuyển sang middleware hoặc controller tiếp theo
    } catch (error) {
      console.error(error);
      res.status(401).json({ msg: "Không được ủy quyền, token thất bại" }); // Token không hợp lệ
    }
  }

  if (!token) {
    res.status(401).json({ msg: "Không được ủy quyền, không có token" });
  }
};

// Middleware kiểm tra quyền admin
const authorize = (roles = []) => {
  if (typeof roles === "string") {
    roles = [roles]; // Chuyển chuỗi thành mảng nếu chỉ có một vai trò
  }

  return (req, res, next) => {
    if (!req.user || (roles.length > 0 && !roles.includes(req.user.role))) {
      return res
        .status(403)
        .json({ msg: "Bạn không có quyền truy cập chức năng này" });
    }
    next();
  };
};

module.exports = { protect, authorize };
