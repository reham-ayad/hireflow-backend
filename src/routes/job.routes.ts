import { Router } from "express";
import {
  getJobs,
  getJobById,
  createJob,
} from "../controllers/job.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getJobs);
router.get("/:id", getJobById);
router.post("/",protect,  createJob);

export default router;