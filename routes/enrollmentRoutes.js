const express = require("express");
const admin = require("../middleware/adminMiddleware");
const {
  enrollCourse,
  getMyCourses,
  checkEnrollment,
  cancelEnrollment,
  getAllEnrollments,
  getEnrollmentById,
  deleteEnrollment
} = require("../controllers/enrollmentController");

const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, enrollCourse);
router.get("/my-courses", protect, getMyCourses);
router.get("/check/:courseId", protect, checkEnrollment);
router.delete("/:courseId", protect, cancelEnrollment);
router.get("/admin",protect, admin, getAllEnrollments);
router.get("/admin/:id",protect, admin, getEnrollmentById);
router.delete("/admin/:id",protect, admin, deleteEnrollment);
module.exports = router;