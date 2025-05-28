// client/src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
// Không cần file HomePage.css nữa đệ nhé!

function HomePage() {
  return (
    // Phần Hero Section: Chiều cao tối thiểu màn hình, flexbox để căn giữa nội dung,
    // nền xám đậm, chữ trắng, padding dọc lớn
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gray-900 text-white py-16 px-4">
      {/* Container: chiều rộng tối đa, căn giữa, khoảng cách ngang */}
      <div className="container mx-auto max-w-4xl text-center">
        {/* Tiêu đề chính: chữ siêu lớn, in đậm, margin dưới, highlight tên */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
          Chào bạn, tôi là <span className="text-blue-400">[Tên của em]</span>
        </h1>
        {/* Tiêu đề phụ: chữ lớn hơn, in đậm nhẹ, màu xám nhạt, margin dưới */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-300 mb-6">
          Một Frontend Developer đam mê tạo ra những trải nghiệm web tuyệt vời!
        </h2>
        {/* Mô tả: chữ vừa, màu xám nhạt, margin dưới, chiều rộng tối đa text */}
        <p className="text-base md:text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
          Tôi chuyên về phát triển giao diện người dùng với{" "}
          <strong className="text-white">ReactJS</strong>, JavaScript, HTML và
          CSS, tập trung vào việc xây dựng các ứng dụng web hiệu suất cao và
          thân thiện với người dùng.
        </p>
        {/* Các nút hành động: flexbox, căn giữa, khoảng cách giữa các nút */}
        <div className="flex flex-col md:flex-row justify-center gap-4">
          {/* Nút chính: nền xanh, chữ trắng, bo góc, padding, đổ bóng, hiệu ứng hover */}
          <Link
            to="/projects"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
            Xem các dự án của tôi
          </Link>
          {/* Nút phụ: nền xám viền, chữ trắng, bo góc, padding, hiệu ứng hover */}
          <Link
            to="/contact"
            className="border-2 border-gray-400 text-gray-300 hover:border-white hover:text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105">
            Liên hệ với tôi
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
