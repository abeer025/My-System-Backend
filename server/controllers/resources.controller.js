import { ResourceModal } from "../Modals/Resources.Modal.js";

// Create a new resource
export const createResource = async (req, res) => {
  try {
    const { title, description, type, url, courseName, batch, section } = req.body;

    const resource = new ResourceModal({
      title,
      description,
      type,
      url,
      courseName,
      batch,
      section,
      date: new Date(), // Automatically sets the current date
      time: new Date().toLocaleTimeString(), // Automatically sets the current time
    });

    const savedResource = await resource.save();
    res.status(201).json({
      message: "Resource created successfully",
      resource: savedResource,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create resource",
      error: error.message,
    });
  }
};

// Get all resources
export const getAllResources = async (req, res) => {
  try {
    const resources = await ResourceModal.find();
    res.status(200).json(resources);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch resources",
      error: error.message,
    });
  }
};

// Get a single resource by ID
export const getResourceById = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await ResourceModal.findById(id);

    if (!resource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch resource",
      error: error.message,
    });
  }
};

// Update a resource by ID
export const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedResource = await ResourceModal.findByIdAndUpdate(
      id,
      { ...updatedData, updatedAt: new Date() },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedResource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json({
      message: "Resource updated successfully",
      resource: updatedResource,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update resource",
      error: error.message,
    });
  }
};

// Delete a resource by ID
export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedResource = await ResourceModal.findByIdAndDelete(id);

    if (!deletedResource) {
      return res.status(404).json({ message: "Resource not found" });
    }

    res.status(200).json({
      message: "Resource deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete resource",
      error: error.message,
    });
  }
};
