import { Router } from "express";
import {
  saveJob,
  unsaveJob,
  getSavedJobs,
} from "../controllers/saved-job.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/:jobId", protect, saveJob);

router.delete("/:jobId", protect, unsaveJob);

router.get("/", protect, getSavedJobs);

export default router;