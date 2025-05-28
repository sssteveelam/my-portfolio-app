// client/src/pages/ContactPage.jsx
import React, { useState } from "react";
// Không cần file ContactPage.css nữa đệ nhé!

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(""); // 'success', 'error', 'sending', ''

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      console.log("Dữ liệu gửi đi:", formData);
      // Giả lập độ trễ mạng
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus("success");
      setFormData({ name: "", email: "", message: "" }); // Reset form
    } catch (error) {
      console.error("Lỗi khi gửi form:", error);
      setStatus("error");
    }
  };

  return (
    // Section chính: padding dọc lớn, nền trắng
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Tiêu đề trang: chữ lớn, in đậm, màu xám đen, căn giữa, margin dưới */}
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">
          Liên Hệ Với Tôi
        </h2>
        {/* Đoạn giới thiệu: chữ vừa, màu xám, căn giữa, margin dưới, chiều rộng tối đa */}
        <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl mx-auto">
          Nếu bạn có bất kỳ câu hỏi nào, muốn thảo luận về dự án hoặc cơ hội hợp
          tác, đừng ngần ngại liên hệ với tôi qua form dưới đây hoặc các kênh
          mạng xã hội.
        </p>

        {/* Grid chứa thông tin liên hệ và form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Phần thông tin liên hệ */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Thông Tin Liên Hệ
            </h3>
            <p className="text-gray-700 mb-3">
              <strong className="text-gray-900">Email:</strong>{" "}
              <a
                href="mailto:your.email@example.com"
                className="text-blue-600 hover:underline">
                your.email@example.com
              </a>
            </p>
            <p className="text-gray-700 mb-3">
              <strong className="text-gray-900">LinkedIn:</strong>{" "}
              <a
                href="https://linkedin.com/in/yourlinkedin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline">
                linkedin.com/in/yourlinkedin
              </a>
            </p>
            <p className="text-gray-700 mb-3">
              <strong className="text-gray-900">GitHub:</strong>{" "}
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline">
                github.com/yourusername
              </a>
            </p>
            <p className="text-gray-700 mb-3">
              <strong className="text-gray-900">Điện thoại:</strong> [Số điện
              thoại của em (tùy chọn)]
            </p>
            <p className="text-gray-700 mt-4 text-sm flex items-center">
              <span className="mr-2 text-blue-500 text-lg">📍</span> TP. Hồ Chí
              Minh, Việt Nam
            </p>
          </div>

          {/* Phần Form liên hệ */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Gửi Tin Nhắn Cho Tôi
            </h3>
            {/* Thông báo trạng thái: nền xanh lá/đỏ nhạt, chữ xanh lá/đỏ đậm, padding, bo góc, margin dưới */}
            {status === "success" && (
              <div className="bg-green-100 text-green-800 px-4 py-3 rounded-md mb-4">
                Tin nhắn của bạn đã được gửi thành công!
              </div>
            )}
            {status === "error" && (
              <div className="bg-red-100 text-red-800 px-4 py-3 rounded-md mb-4">
                Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại.
              </div>
            )}
            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Mỗi nhóm input/label */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-bold mb-2">
                  Tên của bạn:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  // Input styling: full width, padding, bo góc, viền, hiệu ứng focus
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2">
                  Email của bạn:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 text-sm font-bold mb-2">
                  Tin nhắn:
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5" // Chiều cao mặc định của textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"></textarea>
              </div>
              {/* Nút gửi: nền xanh, chữ trắng, padding, bo góc, đổ bóng, hiệu ứng hover, disabled khi đang gửi */}
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md shadow-lg transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={status === "sending"}>
                {status === "sending" ? "Đang gửi..." : "Gửi Tin Nhắn"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
