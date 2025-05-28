import "./App.css";
import AdminLoginPage from "./pages/AdminLoginPage"; // <--- Đảm bảo có dòng này
import AdminDashboard from "./pages/AdminDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProjectsPage from "./pages/ProjectsPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <Router>
      <Navbar /> {/* Thanh điều hướng chung cho toàn bộ trang */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />{" "}
        {/* Sau này sẽ bảo vệ route này */}
      </Routes>
      <Footer /> {/* Chân trang chung */}
    </Router>
  );
}

export default App;
