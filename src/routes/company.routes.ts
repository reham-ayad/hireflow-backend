import { Router } from "express";
import {
  getCompanies,
  getCompanyById,
} from "../controllers/company.controller";

const router = Router();

// Get all companies
router.get("/", getCompanies);

// Get one company with its jobs
router.get("/:id", getCompanyById);

// Create a new company
// router.post("/", createCompany);

export default router;