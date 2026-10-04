import { Router } from "express";
import {
  getMyNotifications,
  markNotificationAsRead,
} from "../controllers/notification.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/", protect, getMyNotifications);

router.patch("/:id/read", protect, markNotificationAsRead);

export default router;