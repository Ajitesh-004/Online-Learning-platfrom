import Assigment from "../models/assignment";

export const addAssignment = async (req, res) => {
  const { title, description, courseId } = req.body;

  if (!title || !description || !courseId) {
    return res.status(400).json({ message: "Enter all input field" });
  }

  try {
    const newAssignment = new Assigment({
      title,
      description,
      course: courseId,
    });

    await newAssignment.save();
    return res.status(201).json({ message: "Assignment created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAssignment = async (req, res) => {
  const courseId = req.parmas;

  try {
    const assignment = await Assigment.findById(courseId);
    if (!assignment) {
      return res.status(404).json({ message: "No assignment found" });
    }

    return res.status(200).json(assignment);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAssignment = async (req, res) => {
  const AssignmentId = req.body;

  try {
    const assignment = await findByIdAndDelete(AssignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "No assignment found" });
    }
    return res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
