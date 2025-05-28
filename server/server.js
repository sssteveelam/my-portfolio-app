// server/server.js
require("dotenv").config(); // Dòng này phải ở đầu tiên để tải biến môi trường

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Cho phép frontend gọi API
const path = require("path"); // Module có sẵn của Node.js để làm việc với đường dẫn file

const app = express();
const PORT = process.env.PORT || 5000; // Cổng cho server backend

// Import routes
const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");

// Middleware: Những đoạn code sẽ chạy trước khi request được xử lý
app.use(cors()); // Kích hoạt CORS cho tất cả các request
app.use(express.json()); // Cho phép server đọc dữ liệu JSON từ request body

// Use routes
app.use("/api/projects", projectRoutes); // Mọi request đến /api/projects sẽ được xử lý bởi projectRoutes
app.use("/api/auth", authRoutes); // Mọi request đến /api/auth sẽ được xử lý bởi authRoutes

// Kết nối MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("💚 MongoDB Connected!");
  } catch (err) {
    console.error("💔 MongoDB connection error:", err.message);
    process.exit(1); // Thoát ứng dụng nếu không kết nối được DB
  }
};

connectDB();

// Tuyến đường API đơn giản để kiểm tra
app.get("/api", (req, res) => {
  res.send("API is running...");
});

// TODO: Mình sẽ thêm các routes API khác vào đây sau này (ví dụ: /api/projects, /api/auth)

// Serve static assets in production (Triển khai lên server thật)
// Nếu em muốn dùng cùng 1 server để deploy cả frontend và backend
// MÌNH SẼ LÀM CÁI NÀY KHI DEPLOY, BÂY GIỜ CHƯA CẦN VỘI NHÉ
/*
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running in development mode...');
    });
}
*/

// Lắng nghe cổng
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
