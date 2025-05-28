// client/src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Component cho từng dòng dự án trong bảng
const ProjectRow = ({ project, onEdit, onDelete }) => (
  <tr className="border-b border-gray-200 hover:bg-gray-50">
    <td className="py-3 px-4 text-sm font-medium text-gray-900">
      {project.title}
    </td>
    <td className="py-3 px-4 text-sm text-gray-700">
      {project.technologies.join(", ")}
    </td>
    <td className="py-3 px-4 text-sm text-gray-700">{project.order}</td>
    <td className="py-3 px-4 text-sm text-gray-700">
      <a
        href={project.githubLink}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline">
        GitHub
      </a>
      {project.demoLink && (
        <span className="ml-2">
          |{" "}
          <a
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline">
            Demo
          </a>
        </span>
      )}
    </td>
    <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">
      <button
        onClick={() => onEdit(project)}
        className="bg-yellow-500 text-white px-3 py-1 rounded-md text-xs hover:bg-yellow-600 transition-colors duration-200">
        Sửa
      </button>
      <button
        onClick={() => onDelete(project._id)}
        className="bg-red-500 text-white px-3 py-1 rounded-md text-xs ml-2 hover:bg-red-600 transition-colors duration-200">
        Xóa
      </button>
    </td>
  </tr>
);

// Component Form thêm/sửa dự án
const ProjectForm = ({ projectToEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    demoLink: "",
    githubLink: "",
    technologies: "",
    order: 0,
  });
  const [message, setMessage] = useState(""); // Thông báo lỗi/thành công trong form

  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        title: projectToEdit.title,
        description: projectToEdit.description,
        imageUrl: projectToEdit.imageUrl,
        demoLink: projectToEdit.demoLink,
        githubLink: projectToEdit.githubLink,
        technologies: projectToEdit.technologies.join(", "), // Chuyển mảng thành chuỗi
        order: projectToEdit.order,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
        demoLink: "",
        githubLink: "",
        technologies: "",
        order: 0,
      });
    }
  }, [projectToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    const dataToSend = {
      ...formData,
      technologies: formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech), // Chuyển chuỗi thành mảng
    };

    try {
      await onSave(dataToSend, projectToEdit?._id); // Truyền ID nếu là sửa
      setMessage("Lưu dự án thành công!");
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
        demoLink: "",
        githubLink: "",
        technologies: "",
        order: 0,
      }); // Reset form sau khi lưu
      onCancel(); // Đóng form sau khi lưu
    } catch (error) {
      const errMsg =
        error.response?.data?.msg || "Lỗi khi lưu dự án. Vui lòng thử lại.";
      setMessage(`Lỗi: ${errMsg}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl relative">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl font-bold">
          &times;
        </button>
        <h3 className="text-2xl font-bold mb-6 text-primary text-center">
          {projectToEdit ? "Sửa Dự Án" : "Thêm Dự Án Mới"}
        </h3>
        {message && (
          <div
            className={`p-3 mb-4 rounded-md text-sm ${
              message.startsWith("Lỗi")
                ? "bg-red-100 text-red-700 border border-red-400"
                : "bg-green-100 text-green-700 border border-green-400"
            }`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700">
              Tiêu đề:
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700">
              Mô tả:
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"></textarea>
          </div>
          <div>
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700">
              URL Ảnh:
            </label>
            <input
              type="url"
              name="imageUrl"
              id="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="demoLink"
              className="block text-sm font-medium text-gray-700">
              Link Demo (tùy chọn):
            </label>
            <input
              type="url"
              name="demoLink"
              id="demoLink"
              value={formData.demoLink}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="githubLink"
              className="block text-sm font-medium text-gray-700">
              Link GitHub:
            </label>
            <input
              type="url"
              name="githubLink"
              id="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="technologies"
              className="block text-sm font-medium text-gray-700">
              Công nghệ (cách nhau bằng dấu phẩy):
            </label>
            <input
              type="text"
              name="technologies"
              id="technologies"
              value={formData.technologies}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="order"
              className="block text-sm font-medium text-gray-700">
              Thứ tự hiển thị:
            </label>
            <input
              type="number"
              name="order"
              id="order"
              value={formData.order}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
              Hủy
            </button>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Lưu Dự Án
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function AdminDashboard() {
  const {
    user,
    logout,
    isAuthenticated,
    isAdmin,
    error: authError,
  } = useAuth();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // Trạng thái hiển thị form thêm/sửa
  const [projectToEdit, setProjectToEdit] = useState(null); // Dự án đang được sửa

  // Bảo vệ route: Nếu không phải admin, chuyển hướng về trang login
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/admin/login");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      if (!isAuthenticated) return; // Đảm bảo đã xác thực mới fetch

      try {
        setError(null);
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/projects"); // Backend tự động lấy token từ header
        setProjects(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi tải dự án:", err);
        setError("Không thể tải các dự án. Vui lòng thử lại.");
        setLoading(false);
        if (err.response && err.response.status === 401) {
          // Nếu token hết hạn hoặc không hợp lệ
          logout(); // Đăng xuất tự động
        }
      }
    };

    fetchProjects();
  }, [isAuthenticated, logout]); // Chạy lại khi trạng thái xác thực thay đổi

  // Xử lý thêm/sửa dự án
  const handleSaveProject = async (projectData, id = null) => {
    try {
      if (id) {
        await axios.put(
          `http://localhost:5000/api/projects/${id}`,
          projectData
        );
      } else {
        await axios.post("http://localhost:5000/api/projects", projectData);
      }
      // Sau khi lưu, fetch lại danh sách dự án
      const res = await axios.get("http://localhost:5000/api/projects");
      setProjects(res.data);
      setShowForm(false); // Ẩn form
      setProjectToEdit(null); // Reset dự án cần sửa
    } catch (err) {
      console.error("Lỗi khi lưu dự án:", err);
      throw err; // Ném lỗi để form có thể hiển thị
    }
  };

  // Xử lý xóa dự án
  const handleDeleteProject = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dự án này?")) {
      try {
        await axios.delete(`http://localhost:5000/api/projects/${id}`);
        setProjects(projects.filter((p) => p._id !== id)); // Cập nhật UI
      } catch (err) {
        console.error("Lỗi khi xóa dự án:", err);
        setError("Không thể xóa dự án. Vui lòng thử lại.");
        if (err.response && err.response.status === 401) {
          logout();
        }
      }
    }
  };

  const handleEditProject = (project) => {
    setProjectToEdit(project);
    setShowForm(true);
  };

  const handleAddProjectClick = () => {
    setProjectToEdit(null); // Reset để đảm bảo là thêm mới
    setShowForm(true);
  };

  if (loading)
    return (
      <div className="container mx-auto px-4 py-10 text-center text-lg">
        Đang tải dữ liệu admin...
      </div>
    );
  if (authError)
    return (
      <div className="container mx-auto px-4 py-10 text-center text-red-700 bg-red-100 border border-red-400 rounded-md">
        {authError}
      </div>
    );
  if (!isAuthenticated || !isAdmin) return null; // Sẽ tự động chuyển hướng bởi useEffect

  return (
    <section className="min-h-[calc(100vh-80px)] py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <div className="container mx-auto bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-heading">
            Chào mừng, {user?.username || "Admin"}!
          </h2>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors duration-200">
            Đăng Xuất
          </button>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-primary">Quản Lý Dự Án</h3>
          <button
            onClick={handleAddProjectClick}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
            Thêm Dự Án Mới
          </button>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-md border border-red-400">
            {error}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Tiêu đề
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Công nghệ
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Thứ tự
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Links
                </th>
                <th className="py-3 px-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((project) => (
                  <ProjectRow
                    key={project._id}
                    project={project}
                    onEdit={handleEditProject}
                    onDelete={handleDeleteProject}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    Chưa có dự án nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {showForm && (
          <ProjectForm
            projectToEdit={projectToEdit}
            onSave={handleSaveProject}
            onCancel={() => setShowForm(false)}
          />
        )}
      </div>
    </section>
  );
}

export default AdminDashboard;
