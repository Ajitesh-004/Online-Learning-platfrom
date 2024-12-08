import Assignment from "../models/assignment";

// Add a new assignment
export const addAssignment = async (req, res) => {
  const { title, description, courseId, dueDate } = req.body;

  // Validate required fields
  if (!title || !description || !courseId || !dueDate) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newAssignment = new Assignment({
      title,
      description,
      course: courseId,
      dueDate,
    });

    await newAssignment.save();
    return res.status(201).json({ message: "Assignment created successfully", assignment: newAssignment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get assignments by course ID
export const getAssignmentsByCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const assignments = await Assignment.find({ course: courseId }).populate("course").exec();

    if (!assignments || assignments.length === 0) {
      return res.status(404).json({ message: "No assignments found for this course" });
    }

    return res.status(200).json(assignments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete an assignment by ID
export const deleteAssignment = async (req, res) => {
  const { assignmentId } = req.params;

  try {
    const assignment = await Assignment.findByIdAndDelete(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    return res.status(200).json({ message: "Assignment deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Update an assignment's status for a specific user
export const updateAssignmentStatus = async (req, res) => {
  const { assignmentId, userId, status } = req.body;

  if (!assignmentId || !userId || !status) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!["pending", "completed"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const assignment = await Assignment.findById(assignmentId);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }

    const userStatus = assignment.status.find((item) => item.user.toString() === userId);

    if (userStatus) {
      userStatus.status = status;
      userStatus.submittedAt = status === "completed" ? new Date() : null;
    } else {
      assignment.status.push({
        user: userId,
        status,
        submittedAt: status === "completed" ? new Date() : null,
      });
    }

    await assignment.save();
    return res.status(200).json({ message: "Assignment status updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
