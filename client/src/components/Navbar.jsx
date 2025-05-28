// client/src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold hover:text-blue-400 transition duration-300">
          [Tên của em] Portfolio
        </Link>
        <ul className="flex space-x-6">
          <li className="nav-item">
            <Link
              to="/"
              className="hover:text-blue-400 transition duration-300">
              Trang Chủ
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/about"
              className="hover:text-blue-400 transition duration-300">
              Giới Thiệu
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/projects"
              className="hover:text-blue-400 transition duration-300">
              Dự Án
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/contact"
              className="hover:text-blue-400 transition duration-300">
              Liên Hệ
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/admin/login"
              className="bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-700 transition duration-300">
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
