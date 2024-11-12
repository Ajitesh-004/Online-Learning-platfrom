import Courses from "../models/courses";

export const AddCourses = async (req, res) => {
  const { title, description, price, thumnbnail } = req.body;

  if (!title || !description || !price || !thumnbnail) {
    return res.status(400).json({ message: "Enter all field" });
  }

  try {
    const newCourse = new Courses({
      title,
      description,
      price,
      thumnbnail,
    });
    await newCourse.save();
    return res.status(201).json({ message: "Assisgment saved successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Courses.find();
    if (!courses) {
      return res.status(404).json({ message: "course not found" });
    }

    return res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCourse = async (req, res) => {
  const { courseId } = req.parmas;
  const data = req.body;

  try {
    const course = await Courses.findOne({ courseId });
    if (!course) {
      return res.status(404).json({ message: "course not found" });
    }

    Object.assign(course, data.data);
    await course.save();
    return res.status(200).json({ message: "Course updated successfu;ly " });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteCourse = async (req, res) => {
  const { courseId } = req.parmas;

  try {
    const Course = await Courses.findByIdAndDelete(courseId);
    if (!Course) {
      return res.status(404).json({ message: "No course found" });
    }

    return res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
