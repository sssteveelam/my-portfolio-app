// client/src/components/Footer.jsx
import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-6 mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} [Tên của em]. Tất cả quyền được bảo
          lưu.
        </p>
        <div className="flex space-x-4">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition duration-300">
            GitHub
          </a>
          <span className="text-gray-500">|</span>{" "}
          <a
            href="https://linkedin.com/in/yourlinkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition duration-300">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
