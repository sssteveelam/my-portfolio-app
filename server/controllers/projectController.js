// server/controllers/projectController.js
const Project = require("../models/Project"); // Import model Project

// @desc    Lấy tất cả dự án
// @route   GET /api/projects
// @access  Public (Ai cũng có thể xem)
exports.getProjects = async (req, res) => {
  try {
    // Tìm tất cả dự án trong DB và sắp xếp theo trường 'order' tăng dần, sau đó theo ngày tạo giảm dần
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.json(projects); // Trả về danh sách dự án dưới dạng JSON
  } catch (err) {
    console.error(err.message); // Ghi log lỗi để debug
    res.status(500).send("Lỗi máy chủ"); // Trả về lỗi 500 nếu có vấn đề
  }
};

// @desc    Lấy một dự án theo ID
// @route   GET /api/projects/:id
// @access  Public
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id); // Tìm dự án theo ID từ URL

    if (!project) {
      return res.status(404).json({ msg: "Không tìm thấy dự án" }); // Nếu không tìm thấy
    }

    res.json(project); // Trả về dự án tìm được
  } catch (err) {
    console.error(err.message);
    // Nếu ID không đúng định dạng của MongoDB, Mongoose sẽ báo lỗi 'CastError'
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Không tìm thấy dự án" });
    }
    res.status(500).send("Lỗi máy chủ");
  }
};

// @desc    Tạo dự án mới
// @route   POST /api/projects
// @access  Private (Chỉ admin mới được tạo) - Sẽ dùng middleware xác thực sau
exports.createProject = async (req, res) => {
  const {
    title,
    description,
    imageUrl,
    demoLink,
    githubLink,
    technologies,
    order,
  } = req.body; // Lấy dữ liệu từ body của request

  try {
    const newProject = new Project({
      title,
      description,
      imageUrl,
      demoLink,
      githubLink,
      technologies,
      order: order || 0, // Nếu không có order, mặc định là 0
    });

    const project = await newProject.save(); // Lưu dự án vào database
    res.status(201).json(project); // Trả về dự án đã tạo với mã 201 (Created)
  } catch (err) {
    console.error(err.message);
    // Kiểm tra lỗi validation từ Mongoose (ví dụ: trường bắt buộc bị thiếu)
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({ msg: messages.join(", ") });
    }
    res.status(500).send("Lỗi máy chủ");
  }
};

// @desc    Cập nhật dự án
// @route   PUT /api/projects/:id
// @access  Private (Chỉ admin mới được cập nhật)
exports.updateProject = async (req, res) => {
  const {
    title,
    description,
    imageUrl,
    demoLink,
    githubLink,
    technologies,
    order,
  } = req.body;

  // Tạo đối tượng chứa các trường cần cập nhật
  const projectFields = {};
  if (title) projectFields.title = title;
  if (description) projectFields.description = description;
  if (imageUrl) projectFields.imageUrl = imageUrl;
  if (demoLink !== undefined) projectFields.demoLink = demoLink; // Cho phép cập nhật thành rỗng
  if (githubLink) projectFields.githubLink = githubLink;
  if (technologies) projectFields.technologies = technologies;
  if (order !== undefined) projectFields.order = order; // Cho phép cập nhật order về 0

  try {
    let project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: "Không tìm thấy dự án" });
    }

    // Cập nhật và trả về dự án mới
    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: projectFields }, // Dùng $set để chỉ cập nhật các trường được chỉ định
      { new: true, runValidators: true } // 'new: true' để trả về tài liệu đã cập nhật; 'runValidators: true' để chạy lại validation schema
    );

    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Không tìm thấy dự án" });
    }
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({ msg: messages.join(", ") });
    }
    res.status(500).send("Lỗi máy chủ");
  }
};

// @desc    Xóa dự án
// @route   DELETE /api/projects/:id
// @access  Private (Chỉ admin mới được xóa)
exports.deleteProject = async (req, res) => {
  try {
    // Tìm và xóa dự án
    const project = await Project.findByIdAndDelete(req.params.id); // Dùng findByIdAndDelete thay vì findByIdAndRemove

    if (!project) {
      return res.status(404).json({ msg: "Không tìm thấy dự án" });
    }

    res.json({ msg: "Dự án đã được xóa" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Không tìm thấy dự án" });
    }
    res.status(500).send("Lỗi máy chủ");
  }
};
