import { Response } from "express";
import Application from "../models/Application";
import Job from "../models/Job";
import { AuthRequest } from "../middleware/auth.middleware";
import User from "../models/User";
import Notification from "../models/Notification";
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

    const {
      fullName,
      email,
      phone,
      location,
      jobTitle,
      skills,
      resume,
      coverLetter,
    } = req.body;

    const application = await Application.create({
      user: userId,
      job: job._id,

      fullName,
      email,
      phone,
      location,
      jobTitle,
      skills,
      resume,
      coverLetter,

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


export const getApplicationsByJob = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;
    const { jobId } = req.params;

    if (!userId) {
      res.status(401).json({
        message: "Not authorized",
      });
      return;
    }

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    if (user.role !== "employer") {
      res.status(403).json({
        message: "Only employers can view job applications",
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
    console.log("JOB EMPLOYER:", job.employer);
console.log("CURRENT USER:", userId);

    if (job.employer.toString() !== userId.toString()) {
      res.status(403).json({
        message: "You can only view applications for your own jobs",
      });
      return;
    }

    const applications = await Application.find({
      job: jobId,
    })
      .populate("user", "-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      job,
      applications,
    });
  } catch (error) {
    console.error("Get job applications error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
export const updateApplicationStatus = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.userId;
    const { applicationId } = req.params;
    const { status } = req.body;

    if (!userId) {
      res.status(401).json({
        message: "Not authorized",
      });
      return;
    }

    const employer = await User.findById(userId);

    if (!employer) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    if (employer.role !== "employer") {
      res.status(403).json({
        message: "Only employers can update application status",
      });
      return;
    }

    const allowedStatuses = [
      "Pending",
      "Interviewing",
      "Accepted",
      "Rejected",
    ];

    if (!allowedStatuses.includes(status)) {
      res.status(400).json({
        message: "Invalid application status",
      });
      return;
    }

    const application = await Application.findById(applicationId);

    if (!application) {
      res.status(404).json({
        message: "Application not found",
      });
      return;
    }

    const job = await Job.findById(application.job);

    if (!job) {
      res.status(404).json({
        message: "Job not found",
      });
      return;
    }

    if (!job.employer) {
  res.status(400).json({
    message: "This job has no employer assigned",
  });
  return;
}

if (job.employer.toString() !== userId.toString()) {
  res.status(403).json({
    message: "You can only update applications for your own jobs",
  });
  return;
}
    application.status = status;
    await application.save();

    let notificationTitle = "Application Status Updated";
    let notificationMessage = `Your application status for ${job.title} has been updated to ${status}.`;

    if (status === "Accepted") {
      notificationTitle = "Application Accepted 🎉";
      notificationMessage = `Congratulations! Your application for ${job.title} has been accepted.`;
    }

    if (status === "Rejected") {
      notificationTitle = "Application Rejected";
      notificationMessage = `Your application for ${job.title} has been rejected.`;
    }

    if (status === "Interviewing") {
      notificationTitle = "Interview Stage";
      notificationMessage = `Your application for ${job.title} has moved to the interview stage.`;
    }

    await Notification.create({
      user: application.user,
      type: "application_status",
      title: notificationTitle,
      message: notificationMessage,
      application: application._id,
      read: false,
    });

    res.status(200).json({
      message: "Application status updated successfully",
      application,
    });
  } catch (error) {
    console.error("Update application status error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};