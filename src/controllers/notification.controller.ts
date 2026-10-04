import { Response } from "express";
import Notification from "../models/Notification";
import { AuthRequest } from "../middleware/auth.middleware";

export const getMyNotifications = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        message: "Not authorized",
      });
      return;
    }

    const notifications = await Notification.find({
      user: userId,
    })
      .populate("application")
      .sort({ createdAt: -1 });

    res.status(200).json({
      notifications,
    });
  } catch (error) {
    console.error("Get notifications error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const markNotificationAsRead = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({
        message: "Not authorized",
      });
      return;
    }

    const notification = await Notification.findOne({
      _id: id,
      user: userId,
    });

    if (!notification) {
      res.status(404).json({
        message: "Notification not found",
      });
      return;
    }

    notification.read = true;
    await notification.save();

    res.status(200).json({
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    console.error("Mark notification as read error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};