import { Request, Response } from "express";
import Company from "../models/Company";
import Job from "../models/Job";

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