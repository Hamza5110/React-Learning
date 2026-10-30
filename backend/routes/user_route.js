import express from "express";
import { protect, authorize } from "../middleware/auth_middleware.js";
import {
  getAllUsers,
  getUser,
  updateUser,
  changePassword,
  deleteUser,
} from "../controller/user_controller.js";

const router = express.Router();

router.get("/", protect, authorize("admin"), getAllUsers);
router.put("/:id/password", protect, changePassword);
router.get("/:id", protect, getUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, authorize("admin"), deleteUser);

export default router;
