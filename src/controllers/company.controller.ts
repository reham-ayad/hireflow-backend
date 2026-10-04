import { Response, Request } from "express";
import Company from "../models/Company";
import Job from "../models/Job";
import User from "../models/User";
import { AuthRequest } from "../middleware/auth.middleware";

export const getCompanies = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const companies = await Company.find().sort({
      createdAt: -1,
    });

    const companiesWithJobs = await Promise.all(
      companies.map(async (company) => {
        const openPositions = await Job.countDocuments({
          company: company.id,
        });

        return {
          ...company.toObject(),
          openPositions,
        };
      })
    );

    res.status(200).json({
      companies: companiesWithJobs,
    });
  } catch (error) {
    console.error("Get companies error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getCompanyById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const company = await Company.findById(id);

    if (!company) {
      res.status(404).json({
        message: "Company not found",
      });
      return;
    }

    const jobs = await Job.find({
      company: company.id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      company,
      jobs,
    });
  } catch (error) {
    console.error("Get company error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const createCompany = async (
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

    const user = await User.findById(userId);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    if (user.role !== "employer") {
      res.status(403).json({
        message: "Only employers can create a company",
      });
      return;
    }

    const existingCompany = await Company.findOne({
      owner: userId,
    });

    if (existingCompany) {
      res.status(409).json({
        message: "You already have a company",
      });
      return;
    }

    const {
      name,
      logo,
      description,
      website,
      location,
      industry,
      employees,
    } = req.body;

    if (!name) {
      res.status(400).json({
        message: "Company name is required",
      });
      return;
    }

    const company = await Company.create({
      owner: userId,
      name,
      logo,
      description,
      website,
      location,
      industry,
      employees,
    });

    res.status(201).json({
      message: "Company created successfully",
      company,
    });
  } catch (error) {
    console.error("Create company error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};