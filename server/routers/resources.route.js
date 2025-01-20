import express from "express";
import { createResource, getAllResources, getResourceById, deleteResource, updateResource } from '../controllers/resources.controller.js'


const router = express.Router();

// 1. Admin creates a new resource
router.route("/").post(createResource);

// 2. Fetch all resources
router.route("/available").get(getAllResources);

// 3. Fetch a specific resource by ID
router.route("/:id").get(getResourceById);

// 4. Admin deletes a resource by ID
router.route("/:id").delete(deleteResource);

// 5. Admin updates a resource by ID
router.route("/:id").put(updateResource);

export default router;
