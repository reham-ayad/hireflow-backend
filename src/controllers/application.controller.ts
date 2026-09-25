import { Response } from "express";
import Application from "../models/Application";
import Job from "../models/Job";
import { AuthRequest } from "../middleware/auth.middleware";

export const applyToJob = async (
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

    const existingApplication = await Application.findOne({
      user: userId,
      job: jobId,
    });

    if (existingApplication) {
      res.status(409).json({
        message: "You have already applied to this job",
      });
      return;
    }

    const application = await Application.create({
      user: userId,
      job: job._id,
      status: "Pending",
    });

    res.status(201).json({
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.error("Apply to job error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
export const getMyApplications = async (
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

    const applications = await Application.find({
      user: userId,
    })
      .populate("job")
      .sort({ createdAt: -1 });

    res.status(200).json({
      applications,
    });
  } catch (error) {
    console.error("Get applications error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};