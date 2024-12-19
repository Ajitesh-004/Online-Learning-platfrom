import Certificate from "../models/certificate.js"; // Adjust the import path as needed
import Course from "../models/courses.js"; // To validate the course
import User from "../models/user.js"; // To validate the user

// Create a new certificate
export const createCertificate = async (req, res) => {
  const { userId, courseId, grade, certificateUrl } = req.body;

  try {
    // Validate user and course
    const user = await User.findById(userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(400).json({ message: "Invalid user or course" });
    }

    // Create a unique certificate number (e.g., use a timestamp or any other method)
    const certificateNumber = `CERT-${new Date().getTime()}`;

    const certificate = new Certificate({
      user: userId,
      course: courseId,
      grade,
      certificateUrl,
      certificateNumber,
    });

    await certificate.save();

    return res.status(201).json({ message: "Certificate created successfully", certificate });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get certificates for a user
export const getCertificatesByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const certificates = await Certificate.find({ user: userId }).populate("course");
    return res.status(200).json(certificates);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get a specific certificate
export const getCertificate = async (req, res) => {
  const { certificateId } = req.params;

  try {
    const certificate = await Certificate.findById(certificateId).populate("course user");
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    return res.status(200).json(certificate);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Delete a certificate
export const deleteCertificate = async (req, res) => {
  const { certificateId } = req.params;

  try {
    const certificate = await Certificate.findByIdAndDelete(certificateId);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    return res.status(200).json({ message: "Certificate deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
