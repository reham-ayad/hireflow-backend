import { Router } from "express";

import {
  getCompanies,
  getCompanyById,
  createCompany,
  deleteCompany,
  getCompanyJobs
} from "../controllers/company.controller";

import { protect } from "../middleware/auth.middleware";

const router = Router();

// Get all companies
router.get("/", getCompanies);
router.get("/:id/jobs", getCompanyJobs);
// Get one company with its jobs
router.get("/:id", getCompanyById);

// Create a new company
router.post("/", protect, createCompany);
router.delete("/:id", protect, deleteCompany);
export default router;