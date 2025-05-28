// client/src/pages/ProjectsPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProjectCard from "../components/ProjectCard";
// Không cần file ProjectsPage.css nữa đệ nhé!

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Đảm bảo URL này đúng với cổng backend của em (thường là 5000)
        const res = await axios.get("http://localhost:5000/api/projects");
        setProjects(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi tải dự án:", err);
        setError("Không thể tải các dự án. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []); // Chỉ chạy một lần khi component được mount

  if (loading)
    return (
      // Căn giữa, chữ lớn, màu xanh, hiệu ứng loading
      <div className="flex items-center justify-center min-h-screen text-2xl text-blue-600">
        Đang tải dự án...
      </div>
    );

  if (error)
    return (
      // Căn giữa, chữ lớn, màu đỏ, nền đỏ nhạt, padding, bo góc
      <div className="flex items-center justify-center min-h-screen text-xl text-red-700 bg-red-100 p-8 rounded-lg mx-auto max-w-lg shadow-md">
        {error}
      </div>
    );

  if (projects.length === 0)
    return (
      // Căn giữa, chữ lớn, màu xám
      <div className="flex items-center justify-center min-h-screen text-2xl text-gray-500">
        Chưa có dự án nào được thêm.
      </div>
    );

  return (
    // Section chính: padding dọc lớn, nền trắng
    <section id="projects" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Tiêu đề trang: chữ lớn, in đậm, màu xám đen, căn giữa, margin dưới */}
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">
          Các Dự Án Của Tôi
        </h2>

        {/* Grid chứa các ProjectCard: Responsive grid (1, 2, 3 cột), khoảng cách giữa các card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsPage;
