import express from "express";
import { protect, authorize } from "../middleware/auth_middleware.js";
import {
  createCourse,
  getCourses,
  getCourseBySlug,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  unenrollFromCourse,
} from "../controller/course_controller.js";

const router = express.Router();

router.post("/", protect, authorize("instructor", "admin"), createCourse);
router.get("/", getCourses);
router.get("/:slug", getCourseBySlug);
router.put("/:slug", protect, authorize("instructor", "admin"), updateCourse);
router.delete("/:slug", protect, authorize("admin"), deleteCourse);
router.post("/:slug/enroll", protect, authorize("student"), enrollInCourse);
router.post(
  "/:slug/unenroll",
  protect,
  authorize("student"),
  unenrollFromCourse,
);

export default router;
