import Content from "../models/content.js";

export const addContent = async (req, res) => {
    const { title, description, course, type, resource, duration, order } = req.body;

    console.log(title, course, type);

    if (!title || !course || !type) {
        return res.status(400).json({ message: "Title, course ID, and type are required" });
    }

    try {
        const newContent = new Content({
        title,
        description,
        course: course,
        type,
        resource,
        duration,
        order,
        });

        await newContent.save();
        return res.status(201).json({ message: "Content added successfully", content: newContent });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getContentByCourse = async (req, res) => {
    const { courseId } = req.params;
  
    try {
        const contents = await Content.find({ course: courseId, isActive: true })
            .sort({ order: 1 })
            .exec();
    
        if (!contents || contents.length === 0) {
            return res.status(404).json({ message: "No content found for this course" });
        }
    
        return res.status(200).json(contents);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteContent = async (req, res) => {
    const { contentId } = req.params;
  
    try {
        const content = await Content.findByIdAndDelete(contentId);
    
        if (!content) {
            return res.status(404).json({ message: "Content not found" });
        }
    
        return res.status(200).json({ message: "Content deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
  