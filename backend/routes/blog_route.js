import express from "express";
import { protect } from "../middleware/auth_middleware.js";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controller/blog_controller.js";

const router = express.Router();

router.get("/all", getAllBlogs);
router.get("/:id", getBlogById);
router.post("/create", protect, createBlog);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

export default router;
