import { Response } from "express";
import SavedJob from "../models/SavedJob";
import Job from "../models/Job";
import { AuthRequest } from "../middleware/auth.middleware";

export const saveJob = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { jobId } = req.params;
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        message: "Not authorized",
      });
      return;
    }

    const job = await Job.findById(jobId);

    if (!job) {
      res.status(404).json({
        message: "Job not found",
      });
      return;
    }

    const existingSavedJob = await SavedJob.findOne({
      user: userId,
      job: jobId,
    });

    if (existingSavedJob) {
      res.status(409).json({
        message: "Job already saved",
      });
      return;
    }

    const savedJob = await SavedJob.create({
      user: userId,
      job: job._id,
    });

    res.status(201).json({
      message: "Job saved successfully",
      savedJob,
    });
  } catch (error) {
    console.error("Save job error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


export const unsaveJob = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { jobId } = req.params;
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({
        message: "Not authorized",
      });
      return;
    }

    const savedJob = await SavedJob.findOneAndDelete({
      user: userId,
      job: jobId,
    });

    if (!savedJob) {
      res.status(404).json({
        message: "Saved job not found",
      });
      return;
    }

    res.status(200).json({
      message: "Job removed from saved jobs",
    });
  } catch (error) {
    console.error("Unsave job error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};


export const getSavedJobs = async (
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

    const savedJobs = await SavedJob.find({
      user: userId,
    })
      .populate("job")
      .sort({ createdAt: -1 });

    res.status(200).json({
      savedJobs,
    });
  } catch (error) {
    console.error("Get saved jobs error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};