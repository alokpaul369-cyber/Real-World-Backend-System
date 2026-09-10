const express = require("express");
const upload = require("../middleware/uploadMiddleware");

const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  uploadCourseImage
} = require("../controllers/courseController");
const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/courses", protect, admin, createCourse);
router.get("/courses", getCourses);
router.get("/courses/:id", getCourseById);
router.put("/courses/:id", protect, admin, updateCourse);
router.delete("/courses/:id", protect, admin, deleteCourse);
router.post("/courses/:id/image", protect, admin, upload.single("image"), uploadCourseImage);
module.exports = router;