import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controller/user_controller.js";

const router = express.Router();

router.get("/", protect, authorize("admin"), getAllUsers);
router.get("/:id", protect, getUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, authorize("admin"), deleteUser);

export default router;
