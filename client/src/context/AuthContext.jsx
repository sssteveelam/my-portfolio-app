// client/src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios"; // Dùng để gọi API

// Tạo Auth Context
const AuthContext = createContext();

// Custom Hook để dễ dàng sử dụng AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null); // Token từ Local Storage
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu ban đầu
  const [error, setError] = useState(null); // Trạng thái lỗi

  // Cấu hình axios để tự động gửi token trong header
  axios.defaults.headers.common["Authorization"] = token
    ? `Bearer ${token}`
    : "";

  // Hàm để kiểm tra trạng thái đăng nhập khi ứng dụng tải lần đầu
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          // Gọi API lấy thông tin người dùng
          const res = await axios.get("http://localhost:5000/api/auth/me");

          setUser(res.data);
        } catch (err) {
          console.error("Lỗi khi tải thông tin người dùng:", err);
          // Nếu token không hợp lệ, xóa token và đăng xuất
          localStorage.removeItem("token");
          setToken(null);
          setUser(null);
          setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token]);

  // Hàm đăng nhập
  const login = async (email, password) => {
    try {
      setError(null);
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token: receivedToken, ...userData } = res.data;
      setToken(receivedToken);
      setUser(userData);

      localStorage.setItem("token", receivedToken);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${receivedToken}`; // Cập nhật header cho axios
      return true;
    } catch (err) {
      const errMsg =
        err.response && err.response.data && err.response.data.msg
          ? err.response.data.msg
          : "Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu.";
      setError(errMsg);
      return false; // Đăng nhập thất bại
    }
  };

  // Hàm đăng ký
  const register = async (username, email, password) => {
    try {
      setError(null);

      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });

      const { token: receivedToken, ...userData } = res.data;
      setToken(receivedToken);

      setUser(userData);
      localStorage.setItem("token", receivedToken);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${receivedToken}`;
      return true;
    } catch (err) {
      const errMsg =
        err.response && err.response.data && err.response.data.msg
          ? err.response.data.msg
          : "Đăng ký thất bại. Vui lòng thử lại sau.";
      setError(errMsg);
      return false;
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token"); // Xóa token khỏi Local Storage
    delete axios.defaults.headers.common["Authorization"]; // Xóa header token khỏi axios
    setError(null);
  };
  // Giá trị mà AuthContext sẽ cung cấp
  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token, // Kiểm tra đã đăng nhập chưa
    isAdmin: user && user.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
