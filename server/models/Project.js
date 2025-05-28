// server/models/Project.js
const mongoose = require("mongoose");

// Định nghĩa Schema cho Project
// Schema giống như một bản thiết kế, mô tả cấu trúc của một tài liệu (document) trong MongoDB
const ProjectSchema = new mongoose.Schema(
  {
    title: {
      // Tiêu đề của dự án
      type: String,
      required: [true, "Tên dự án là bắt buộc"], // Đây là trường bắt buộc
      trim: true, // Tự động loại bỏ khoảng trắng thừa ở đầu và cuối chuỗi
    },
    description: {
      // Mô tả chi tiết về dự án
      type: String,
      required: [true, "Mô tả dự án là bắt buộc"],
    },
    imageUrl: {
      // Đường dẫn đến ảnh đại diện của dự án
      type: String,
      required: [true, "Ảnh dự án là bắt buộc"],
    },
    demoLink: {
      // Link dẫn đến phiên bản demo trực tiếp của dự án
      type: String,
      default: "", // Mặc định là chuỗi rỗng nếu không có
    },
    githubLink: {
      // Link dẫn đến mã nguồn GitHub của dự án
      type: String,
      required: [true, "Link GitHub là bắt buộc"],
    },
    technologies: {
      // Các công nghệ đã sử dụng trong dự án (ví dụ: ['React', 'Node.js', 'MongoDB'])
      type: [String], // Mảng các chuỗi
      required: [true, "Công nghệ sử dụng là bắt buộc"],
    },
    order: {
      // Thứ tự hiển thị của dự án trên trang portfolio
      type: Number,
      default: 0, // Mặc định là 0
    },
    createdAt: {
      // Ngày tạo bản ghi (tự động thêm vào)
      type: Date,
      default: Date.now, // Giá trị mặc định là thời gian hiện tại
    },
  },
  {
    timestamps: true, // Tự động thêm trường `createdAt` và `updatedAt`
  }
);

// Xuất (export) Model để có thể sử dụng ở các file khác
module.exports = mongoose.model("Project", ProjectSchema);
