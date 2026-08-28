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
      isPublished,
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
        message: "Please provide all required fields",
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
      isPublished,
    });

    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get All Courses........................
const getCourses = async (req, res) => {
  try {
    const {
      search,
      category,
      level,
      minPrice,
      maxPrice,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    const filter = {};
    // Search.............
    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          description: {
            $regex: search,
            $options: "i",
          },
        },
        {
          instructor: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }
    // Category filter.............
    if (category) {
      filter.category = {
        $regex: `^${category}$`,
        $options: "i",
      };
    }
    // Level filter...............
    if (level) {
      filter.level = level;
    }
    // Price filter.........
    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) {
        filter.price.$gte = Number(minPrice);
      }
      if (maxPrice !== undefined) {
        filter.price.$lte = Number(maxPrice);
      }
    }
    // Pagination.................
    const currentPage = Math.max(Number(page), 1);
    const itemsPerPage = Math.max(Number(limit), 1);
    const skip = (currentPage - 1) * itemsPerPage;

    // Sorting..................
    let sortOption = {
      createdAt: -1,
    };
    if (sort === "price") {
      sortOption = { price: 1 };
    }
    if (sort === "-price") {
      sortOption = { price: -1 };
    }
    if (sort === "title") {
      sortOption = { title: 1 };
    }
    if (sort === "-title") {
      sortOption = { title: -1 };
    }
    if (sort === "newest") {
      sortOption = { createdAt: -1 };
    }
    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }

    // Get courses.....................
    const courses = await Course
      .find(filter)
      .sort(sortOption)
      .skip(skip)
      .limit(itemsPerPage);
    const totalCourses = await Course.countDocuments(filter);
    const totalPages = Math.ceil(totalCourses / itemsPerPage);

    res.status(200).json({
      message: "Courses retrieved successfully",
      pagination: {
        currentPage,
        itemsPerPage,
        totalCourses,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      },
      courses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Get Single Course.......................
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return (
        res.status(404),
        json({
          message: "Course not found",
        })
      );
    }
    res.status(200).json({
      message: "Course retrived successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Update Course..........................
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
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
      isPublished,
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
      course: updatedCourses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete Course..........................
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    await course.deleteOne();
    res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
module.exports = {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
