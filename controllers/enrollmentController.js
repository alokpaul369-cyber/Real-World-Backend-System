const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

// Enroll in course.......................
const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({
        message: "Course ID is required",
      });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    const existingEnrollment = await Enrollment.findOne({
      user: req.user._id,
      course: courseId,
    });
    if (existingEnrollment) {
      return res.status(400).json({
        message: "You are already enrolled in this course",
      });
    }
    const enrollment = await Enrollment.create({
      user: req.user._id,
      course: courseId,
    });

    res.status(201).json({
      message: "Successfully enrolled in course",
      enrollment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// View my course....................
const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      user: req.user._id,
      status: "active",
    }).populate(
      "course",
      "title description instructor category price duration level",
    );
    res.status(200).json({
      message: "Enrollment courses retrieved successfully",
      count: enrollments.length,
      enrollments,
    });
  } catch (error) {
    res.ststus(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Check Enrollment Status.....................
const checkEnrollment = async (req, res) => {
  try {
    const { courseId } = req.params;
    const enrollment = await Enrollment.findOne({
      user: req.user._id,
      course: courseId,
      status: "active",
    });
    if (!enrollment) {
      return res.status(200).json({
        enrolled: false,
      });
    }
    res.status(200).json({
      enrolled: true,
      enrollment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Cancel Enrollment.....................
const cancelEnrollment = async (req, res) => {
  try {
    const { courseId } = req.params;

    const enrollment = await Enrollment.findOne({
      user: req.user._id,
      course: courseId,
      status: "active",
    });

    if (!enrollment) {
      return res.status(404).json({
        message: "Enrollment not found",
      });
    }

    enrollment.status = "cancelled";

    await enrollment.save();

    res.status(200).json({
      message: "Enrollment cancelled successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
    enrollCourse,
    getMyCourses,
    checkEnrollment,
    cancelEnrollment
};