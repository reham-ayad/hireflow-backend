import mongoose from "mongoose";
import dotenv from "dotenv";
import Company from "../models/Company";

dotenv.config();

const companies = [
  {
    name: "GreenCore Energy",
    logo: "images/GreenCore",
    description:
      "Delivering innovative renewable energy technologies to build a cleaner and more sustainable future.",
    website: "https://greencore.example.com",
    location: "Cairo, Egypt",
    industry: "Renewable Energy",
    employees: "500-1000",
  },
  {
    name: "TechNova",
    logo: "images/TechNova",
    description:
      "Building modern digital products and scalable software solutions for businesses worldwide.",
    website: "https://technova.example.com",
    location: "Cairo, Egypt",
    industry: "Software",
    employees: "201-500",
  },
  {
    name: "CloudBridge",
    logo: "images/CloudBridge",
    description:
      "Providing cloud infrastructure and backend solutions that help companies scale faster.",
    website: "https://cloudbridge.example.com",
    location: "Remote",
    industry: "Cloud Computing",
    employees: "51-200",
  },
  {
    name: "PixelCraft",
    logo: "images/PixelCraft",
    description:
      "Creating thoughtful digital experiences through innovative UI and UX design.",
    website: "https://pixelcraft.example.com",
    location: "Alexandria, Egypt",
    industry: "Design",
    employees: "51-200",
  },
  {
    name: "FinEdge",
    logo: "images/FinEdge",
    description:
      "Developing financial technology solutions that make modern banking simpler and more accessible.",
    website: "https://finedge.example.com",
    location: "Cairo, Egypt",
    industry: "FinTech",
    employees: "201-500",
  },
  {
    name: "HealthPlus",
    logo: "images/HealthPlus",
    description:
      "Building digital healthcare solutions that connect patients, doctors, and healthcare providers.",
    website: "https://healthplus.example.com",
    location: "Giza, Egypt",
    industry: "Healthcare",
    employees: "500-1000",
  },
  {
    name: "ShopSphere",
    logo: "images/ShopSphere",
    description:
      "Creating e-commerce technology that helps businesses deliver better online shopping experiences.",
    website: "https://shopsphere.example.com",
    location: "Cairo, Egypt",
    industry: "E-Commerce",
    employees: "201-500",
  },
  {
    name: "TravelNest",
    logo: "images/TravelNest",
    description:
      "Building technology that makes discovering and booking travel experiences easier.",
    website: "https://travelnest.example.com",
    location: "Remote",
    industry: "Travel & Tourism",
    employees: "51-200",
  },
  {
    name: "DataCore",
    logo: "images/DataCore",
    description:
      "Helping organizations turn their data into useful insights through analytics and technology.",
    website: "https://datacore.example.com",
    location: "Cairo, Egypt",
    industry: "Data & Analytics",
    employees: "201-500",
  },
  {
    name: "EduVerse",
    logo: "images/EduVerse",
    description:
      "Developing digital learning platforms that make education more engaging and accessible.",
    website: "https://eduverse.example.com",
    location: "Menoufia, Egypt",
    industry: "Education Technology",
    employees: "51-200",
  },
];

const seedCompanies = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    await Company.deleteMany();

    await Company.insertMany(companies);

    console.log("Companies seeded successfully");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Company seed error:", error);
    process.exit(1);
  }
};

seedCompanies();
