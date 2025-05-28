// server/routes/projectRoutes.js
const express = require("express");
const router = express.Router(); // Lấy đối tượng Router từ Express
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController"); // Import các hàm từ controller
const { protect, authorize } = require("../middleware/authMiddleware"); // Import middleware xác thực

// Tuyến đường PUBLIC (ai cũng có thể truy cập)
router.route("/").get(getProjects); // GET /api/projects để lấy tất cả dự án

 router.route("/:id").get(getProjectById); // GET /api/projects/:id để lấy một dự án theo ID

// Tuyến đường PRIVATE (chỉ ADMIN mới có thể truy cập)
// Mình sẽ áp dụng middleware 'protect' và 'authorize' cho các tuyến đường này
router.route("/").post(protect, authorize("admin"), createProject); // POST /api/projects để tạo dự án mới

router
  .route("/:id")
  .put(protect, authorize("admin"), updateProject) // PUT /api/projects/:id để cập nhật dự án
  .delete(protect, authorize("admin"), deleteProject); // DELETE /api/projects/:id để xóa dự án

module.exports = router;
