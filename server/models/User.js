// server/models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Thư viện để mã hóa mật khẩu

const UserSchema = new mongoose.Schema({
  username: {
    // Tên đăng nhập của người dùng
    type: String,
    required: [true, "Tên đăng nhập là bắt buộc"],
    unique: true, // Đảm bảo tên đăng nhập là duy nhất
    trim: true,
  },
  email: {
    // Email của người dùng (có thể dùng để đăng nhập hoặc khôi phục mật khẩu)
    type: String,
    required: [true, "Email là bắt buộc"],
    unique: true,
    trim: true,
    lowercase: true, // Chuyển email sang chữ thường để dễ quản lý
    match: [/.+@.+\..+/, "Vui lòng nhập email hợp lệ"], // Kiểm tra định dạng email
  },
  password: {
    // Mật khẩu (sẽ được mã hóa)
    type: String,
    required: [true, "Mật khẩu là bắt buộc"],
    minlength: [6, "Mật khẩu phải có ít nhất 6 ký tự"],
  },
  role: {
    // Vai trò của người dùng (ví dụ: 'admin', 'user')
    type: String,
    enum: ["admin", "user"], // Chỉ cho phép các giá trị này
    default: "user", // Mặc định là 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// MIDDLEWARE Mongoose: Chạy trước khi lưu người dùng vào DB
// Mục đích: Mã hóa mật khẩu trước khi lưu
UserSchema.pre("save", async function (next) {
  // Chỉ mã hóa mật khẩu nếu nó bị thay đổi (hoặc là lần đầu tạo)
  if (!this.isModified("password")) {
    next(); // Chuyển sang middleware tiếp theo hoặc lưu
  }

  // Tạo salt (chuỗi ngẫu nhiên) để tăng cường bảo mật khi mã hóa
  const salt = await bcrypt.genSalt(10); // 10 là độ phức tạp của salt
  // Mã hóa mật khẩu bằng salt
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// METHOD Mongoose: Tạo phương thức để so sánh mật khẩu
// Mục đích: Kiểm tra mật khẩu người dùng nhập vào có khớp với mật khẩu đã mã hóa trong DB không
UserSchema.methods.matchPassword = async function (enteredPassword) {
  // So sánh mật khẩu đã nhập với mật khẩu đã mã hóa trong DB
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
