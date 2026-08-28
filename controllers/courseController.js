const Course = require("../models/Course");

//Create Course ..........................
const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      instructor,
      category,
      price,
      duration,
      level,
      isPublished
    } = req.body;
    if (
      !title ||
      !description ||
      !instructor ||
      !category ||
      price === undefined ||
      duration === undefined
    ) {
      return res.status(400).json({
        message:"Please provide all required fields"
      });
    }
    const course = await Course.create({
    title,
    description,
    instructor,
    category,
    price,
    duration,
    level,
    isPublished
    });

    res.status(201).json({
      message: "Course created successfully",
      course
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// Get All Courses........................
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      message: "Course retrieved successfully",
      count: courses.length,
      courses
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// Get Single Course.......................
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404),json({
        message: "Course not found"
      });
    }
    res.status(200).json({
      message: "Course retrived successfully",
      course
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};

// Update Course..........................
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
    if (!course) {
    return res.status(404).json({
        message: "Course not found"
    });
  }
  const {
   title,
   description,
   instructor,
   category,
   price,
   duration,
   level,
   isPublished
  } = req.body;
  if (title !== undefined) course.title = title;
  if (description !== undefined) course.description = description;
  if (instructor !== undefined) course.instructor = instructor;
  if (category !== undefined) course.category = category;
  if (price !== undefined) course.price = price;
  if (duration !== undefined) course.duration = duration;
  if (level !== undefined) course.level = level;
  if (isPublished !== undefined) course.isPublished = isPublished;

  const updatedCourses = await course.save();
  res.status(200).json({
    message: "Course updated successfully",
    course: updatedCourses
  });
} catch (error) {
  res.status(500).json({
    message: "Server error",
    error: error.message
  });
}
};

// Delete Course..........................
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if(!course) {
      return res.status(404).json({
        message: "Course not found"
      });
    }
    await course.deleteOne();
     res.status(200).json({
      message: "Course deleted successfully"
     });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};
module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse
};