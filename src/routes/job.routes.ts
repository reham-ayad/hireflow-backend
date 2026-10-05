import { Router } from "express";
import {
  getJobs,
  getJobById,
  createJob,
  deleteJob
} from "../controllers/job.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/",protect,  createJob);
router.delete("/:id", protect, deleteJob);

export default router;