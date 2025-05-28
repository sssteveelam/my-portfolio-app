// client/src/pages/AboutPage.jsx
import React from "react";

function AboutPage() {
  return (
    // Section chính: padding dọc lớn, nền xám nhẹ
    <section id="about" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Tiêu đề trang: chữ lớn, in đậm, màu xám đen, căn giữa, margin dưới */}
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">
          Giới Thiệu Về Tôi
        </h2>

        {/* Nội dung chính: flexbox, đảo chiều trên màn hình nhỏ, khoảng cách giữa ảnh và text */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
          {/* Phần text giới thiệu */}
          <div className="md:w-2/3">
            {/* Đoạn văn: chữ vừa, màu xám, margin dưới */}
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Xin chào! Tôi là{" "}
              <strong className="text-blue-600">[Tên của em]</strong>, một
              Frontend Developer đầy nhiệt huyết với niềm đam mê xây dựng các
              ứng dụng web đẹp mắt và hiệu quả. Tôi vừa hoàn thành khóa học{" "}
              <strong className="text-blue-600">ReactJS</strong> và rất háo hức
              áp dụng những kiến thức đã học vào các dự án thực tế.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Hành trình đến với lập trình của tôi bắt đầu từ việc thích thú
              khám phá cách các trang web hoạt động. Tôi đặc biệt yêu thích việc
              biến những ý tưởng thiết kế thành giao diện người dùng tương tác,
              mượt mà và dễ sử dụng. Tôi luôn tìm tòi, học hỏi những công nghệ
              mới nhất để nâng cao kỹ năng của mình.
            </p>

            {/* Tiêu đề Kỹ Năng */}
            <h3 className="text-3xl font-bold text-gray-800 mb-6">
              Kỹ Năng Của Tôi
            </h3>
            {/* Grid kỹ năng: 3 cột trên màn hình lớn, 2 cột trên màn hình trung bình, 1 cột trên màn hình nhỏ */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              {/* Mỗi danh mục kỹ năng: nền trắng, bo góc, đổ bóng nhẹ, padding */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                  Ngôn ngữ lập trình
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>JavaScript (ES6+)</li>
                  <li>HTML5</li>
                  <li>CSS3</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                  Thư viện & Framework
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>ReactJS</li>
                  <li>React Router</li>
                  <li>Redux (cơ bản)</li>
                  <li>Node.js (cơ bản cho Backend)</li>
                  <li>Express.js (cơ bản cho Backend)</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h4 className="text-xl font-semibold text-gray-800 mb-3">
                  Công cụ & Khác
                </h4>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Git & GitHub</li>
                  <li>npm / Yarn</li>
                  <li>VS Code</li>
                  <li>Responsive Design</li>
                  <li>Figma (cơ bản)</li>
                </ul>
              </div>
            </div>

            {/* Tiêu đề Mục tiêu */}
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Mục tiêu</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Tôi đang tìm kiếm cơ hội để gia nhập một đội ngũ năng động, nơi
              tôi có thể học hỏi từ các developer giàu kinh nghiệm và đóng góp
              vào những sản phẩm có ý nghĩa. Tôi tin rằng với tinh thần ham học
              hỏi và sự nỗ lực không ngừng, tôi sẽ nhanh chóng trở thành một
              thành viên có giá trị.
            </p>
          </div>

          {/* Phần ảnh đại diện */}
          <div className="md:w-1/3 flex justify-center md:justify-end">
            <img
              src="https://via.placeholder.com/400x500?text=Your+Photo" // Thay bằng ảnh của em
              alt="Ảnh của bạn"
              // Ảnh bo tròn hoàn toàn, đổ bóng, hiệu ứng nhẹ khi rê chuột
              className="w-full max-w-xs md:max-w-none rounded-lg shadow-xl transform transition duration-300 hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
