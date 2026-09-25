import { Request, Response } from "express";
import Job from "../models/Job";

export const getJobs = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.status(200).json({
      jobs,
    });
  } catch (error) {
    console.error("Get jobs error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getJobById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const job = await Job.findById(id);

    if (!job) {
      res.status(404).json({
        message: "Job not found",
      });
      return;
    }

    res.status(200).json({
      job,
    });
  } catch (error) {
    console.error("Get job error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const createJob = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      title,
      company,
      description,
      location,
      jobType,
      salary,
      requirements,
    } = req.body;

    if (
      !title ||
      !company ||
      !description ||
      !location ||
      !jobType
    ) {
      res.status(400).json({
        message: "Required fields are missing",
      });
      return;
    }

    const job = await Job.create({
      title,
      company,
      description,
      location,
      jobType,
      salary,
      requirements,
    });

    res.status(201).json({
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.error("Create job error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};