import { Router } from "express";
import {
  applyToJob,
  getApplicationsByJob,
  getMyApplications,
    updateApplicationStatus,
} from "../controllers/application.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/:jobId", protect, applyToJob);

router.get("/my-applications", protect, getMyApplications);
router.get("/job/:jobId", protect, getApplicationsByJob);
router.patch("/:applicationId/status", protect, updateApplicationStatus);
export default router;