import { Router } from "express";
import {
  applyToJob,
  getMyApplications,
} from "../controllers/application.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/:jobId", protect, applyToJob);

router.get("/my-applications", protect, getMyApplications);

export default router;