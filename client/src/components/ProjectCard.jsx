// client/src/components/ProjectCard.jsx
import React from "react";

function ProjectCard({ project }) {
  return (
    // Card container: bo góc, đổ bóng, nền trắng, padding, hiệu ứng khi rê chuột
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <img
        src={project.imageUrl}
        alt={project.title}
        // Ảnh chiếm hết chiều ngang, chiều cao tự động, bo tròn góc trên
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-5">
        {/* Tiêu đề dự án: chữ lớn, in đậm, màu xám đen */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {project.title}
        </h3>
        {/* Mô tả dự án: chữ nhỏ, màu xám, giới hạn 3 dòng */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {project.description}
        </p>
        {/* Danh sách công nghệ: flexbox, wrap, khoảng cách giữa các tag */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies &&
            project.technologies.map((tech, index) => (
              // Tag công nghệ: nền xanh nhạt, chữ xanh đậm, bo góc, padding nhỏ
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {tech}
              </span>
            ))}
        </div>
        {/* Các nút hành động: flexbox, khoảng cách giữa các nút */}
        <div className="flex gap-3">
          {project.demoLink && (
            // Nút Demo: nền xanh, chữ trắng, padding, bo góc, hiệu ứng khi rê chuột
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
              Demo
            </a>
          )}
          {/* Nút GitHub: nền xám, chữ trắng, padding, bo góc, hiệu ứng khi rê chuột */}
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gray-700 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-800 transition duration-300">
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
