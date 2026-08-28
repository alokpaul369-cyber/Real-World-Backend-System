const express = require("express");

const {
  enrollCourse,
  getMyCourses,
  checkEnrollment,
  cancelEnrollment
} = require("../controllers/enrollmentController");

const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, enrollCourse);
router.get("/my-courses", protect, getMyCourses);
router.get("/check/:courseId", protect, checkEnrollment);
router.delete("/:courseId", protect, cancelEnrollment);

module.exports = router;