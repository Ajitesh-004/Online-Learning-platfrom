import Courses from "../models/courses";

// Add a new course
export const addCourse = async (req, res) => {
  const { title, category, description, duration, price, thumbnail } = req.body;

  if (!title || !category || !description || !duration || !price || !thumbnail) {
    return res.status(400).json({ message: "Please fill in all required fields." });
  }

  try {
    const newCourse = new Courses({
      title,
      category,
      description,
      duration,
      price,
      thumbnail,
    });

    await newCourse.save();
    return res.status(201).json({ message: "Course added successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Courses.find();
    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses found." });
    }

    return res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Update a course by ID
export const updateCourse = async (req, res) => {
  const { courseId } = req.params; // Fixed typo in `params`
  const updateData = req.body;

  try {
    const course = await Courses.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    Object.assign(course, updateData);
    await course.save();

    return res.status(200).json({ message: "Course updated successfully.", course });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Delete a course by ID
export const deleteCourse = async (req, res) => {
  const { courseId } = req.params; // Fixed typo in `params`

  try {
    const course = await Courses.findByIdAndDelete(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    return res.status(200).json({ message: "Course deleted successfully." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
