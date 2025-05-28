// client/src/pages/AdminLoginPage.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook
import { useNavigate } from "react-router-dom";

function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isAuthenticated, isAdmin } = useAuth(); // Lấy hàm login, error, isAuthenticated từ context
  const navigate = useNavigate();

  // Nếu đã đăng nhập và là admin, chuyển hướng về dashboard
  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      navigate("/admin/dashboard");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password); // Gọi hàm login từ context
    if (success) {
      // navigate('/admin/dashboard'); // Chuyển hướng đã xử lý trong useEffect
    }
  };

  return (
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg border border-gray-200">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng Nhập Admin
          </h2>
        </div>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md border border-red-400 text-center">
            {error}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Địa chỉ Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Địa chỉ Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Mật khẩu
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Đăng Nhập
            </button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-600">
          <p>Bạn chưa có tài khoản admin? Liên hệ [Tên của em] để đăng ký.</p>
          {/* Hoặc nếu muốn tự đăng ký 1 lần: */}
          {/* <button className="text-primary hover:underline" onClick={() => navigate('/admin/register')}>Đăng ký ngay</button> */}
        </div>
      </div>
    </section>
  );
}

export default AdminLoginPage;
