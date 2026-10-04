import { Router } from "express";

import {
  getCompanies,
  getCompanyById,
  createCompany,
} from "../controllers/company.controller";

import { protect } from "../middleware/auth.middleware";

const router = Router();

// Get all companies
router.get("/", getCompanies);

// Get one company with its jobs
router.get("/:id", getCompanyById);

// Create a new company
router.post("/", protect, createCompany);

export default router;