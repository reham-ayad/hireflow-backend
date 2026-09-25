import mongoose from "mongoose";
import dotenv from "dotenv";
import Company from "../models/Company";
import Job from "../models/Job";

dotenv.config();

const seedJobs = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);

    const companies = await Company.find();

    if (companies.length === 0) {
      console.log("No companies found. Seed companies first.");
      process.exit(1);
    }

    const getCompanyId = (name: string) => {
      const company = companies.find(
        (company) => company.name === name
      );

      if (!company) {
        throw new Error(`Company not found: ${name}`);
      }

      return company._id;
    };

    const jobs = [
      {
        title: "Frontend React Developer",
        company: getCompanyId("TechNova"),
        description:
          "Build modern and responsive web applications using React and TypeScript.",
        location: "Cairo, Egypt",
        jobType: "Full-time",
        salary: "18000 - 25000 EGP",
        requirements: [
          "React",
          "TypeScript",
          "JavaScript",
          "HTML",
          "CSS",
          "Git",
        ],
      },

      {
        title: "Angular Developer",
        company: getCompanyId("GreenCore Energy"),
        description:
          "Develop responsive internal and customer-facing applications using Angular.",
        location: "Cairo, Egypt",
        jobType: "Full-time",
        salary: "16000 - 23000 EGP",
        requirements: [
          "Angular",
          "TypeScript",
          "JavaScript",
          "RxJS",
          "REST APIs",
          "Git",
        ],
      },

      {
        title: "Solar Energy Engineer",
        company: getCompanyId("GreenCore Energy"),
        description:
          "Work with our engineering team to design and support renewable energy projects.",
        location: "Cairo, Egypt",
        jobType: "Full-time",
        salary: "18000 - 26000 EGP",
        requirements: [
          "Renewable Energy",
          "Engineering",
          "Solar Energy",
          "Technical Analysis",
        ],
      },

      {
        title: "Node.js Backend Developer",
        company: getCompanyId("CloudBridge"),
        description:
          "Develop scalable REST APIs and backend services for cloud-based applications.",
        location: "Remote",
        jobType: "Remote",
        salary: "20000 - 30000 EGP",
        requirements: [
          "Node.js",
          "Express.js",
          "TypeScript",
          "MongoDB",
          "REST APIs",
          "Git",
        ],
      },

      {
        title: "Cloud Engineer",
        company: getCompanyId("CloudBridge"),
        description:
          "Help maintain cloud infrastructure and deploy scalable backend systems.",
        location: "Remote",
        jobType: "Full-time",
        salary: "22000 - 32000 EGP",
        requirements: [
          "AWS",
          "Docker",
          "Linux",
          "Cloud Computing",
          "CI/CD",
        ],
      },

      {
        title: "UI/UX Designer",
        company: getCompanyId("PixelCraft"),
        description:
          "Design intuitive and engaging experiences for web and mobile applications.",
        location: "Alexandria, Egypt",
        jobType: "Full-time",
        salary: "12000 - 18000 EGP",
        requirements: [
          "Figma",
          "UI Design",
          "UX Design",
          "Wireframing",
          "Prototyping",
        ],
      },

      {
        title: "Product Designer",
        company: getCompanyId("PixelCraft"),
        description:
          "Collaborate with product and engineering teams to create user-centered digital products.",
        location: "Remote",
        jobType: "Full-time",
        salary: "15000 - 22000 EGP",
        requirements: [
          "Figma",
          "UX Research",
          "Design Systems",
          "Prototyping",
        ],
      },

      {
        title: "Junior Financial Analyst",
        company: getCompanyId("FinEdge"),
        description:
          "Analyze financial data and prepare reports to support business decisions.",
        location: "Cairo, Egypt",
        jobType: "Full-time",
        salary: "12000 - 18000 EGP",
        requirements: [
          "Excel",
          "Financial Analysis",
          "Reporting",
          "Data Analysis",
        ],
      },

      {
        title: "Backend Developer",
        company: getCompanyId("HealthPlus"),
        description:
          "Develop secure backend services for digital healthcare applications.",
        location: "Giza, Egypt",
        jobType: "Full-time",
        salary: "18000 - 26000 EGP",
        requirements: [
          "Node.js",
          "TypeScript",
          "MongoDB",
          "REST APIs",
          "Git",
        ],
      },

      {
        title: "E-Commerce Frontend Developer",
        company: getCompanyId("ShopSphere"),
        description:
          "Build fast and responsive e-commerce experiences for online shoppers.",
        location: "Cairo, Egypt",
        jobType: "Full-time",
        salary: "16000 - 24000 EGP",
        requirements: [
          "JavaScript",
          "React",
          "TypeScript",
          "HTML",
          "CSS",
        ],
      },

      {
        title: "WordPress Developer",
        company: getCompanyId("ShopSphere"),
        description:
          "Create and customize WordPress websites and e-commerce solutions.",
        location: "Remote",
        jobType: "Part-time",
        salary: "10000 - 16000 EGP",
        requirements: [
          "WordPress",
          "PHP",
          "HTML",
          "CSS",
          "JavaScript",
        ],
      },

      {
        title: "Junior Flutter Developer",
        company: getCompanyId("TravelNest"),
        description:
          "Develop cross-platform mobile applications for travel and booking services.",
        location: "Remote",
        jobType: "Full-time",
        salary: "15000 - 22000 EGP",
        requirements: [
          "Flutter",
          "Dart",
          "Firebase",
          "REST APIs",
          "Git",
        ],
      },

      {
        title: "Data Analyst",
        company: getCompanyId("DataCore"),
        description:
          "Analyze business data and create dashboards that help teams make informed decisions.",
        location: "Cairo, Egypt",
        jobType: "Full-time",
        salary: "15000 - 22000 EGP",
        requirements: [
          "SQL",
          "Excel",
          "Power BI",
          "Data Analysis",
          "Data Visualization",
        ],
      },

      {
        title: "Junior Python Developer",
        company: getCompanyId("DataCore"),
        description:
          "Build and maintain Python-based data processing and backend applications.",
        location: "Cairo, Egypt",
        jobType: "Full-time",
        salary: "14000 - 20000 EGP",
        requirements: [
          "Python",
          "Django",
          "SQL",
          "REST APIs",
          "Git",
        ],
      },

      {
        title: "Frontend Developer",
        company: getCompanyId("EduVerse"),
        description:
          "Develop engaging learning interfaces for students and instructors.",
        location: "Menoufia, Egypt",
        jobType: "Full-time",
        salary: "12000 - 18000 EGP",
        requirements: [
          "Angular",
          "TypeScript",
          "HTML",
          "SCSS",
          "REST APIs",
        ],
      },

      {
        title: "Content Specialist",
        company: getCompanyId("EduVerse"),
        description:
          "Create and organize educational content for our online learning platform.",
        location: "Remote",
        jobType: "Part-time",
        salary: "8000 - 12000 EGP",
        requirements: [
          "Content Writing",
          "Research",
          "Communication",
          "Microsoft Office",
        ],
      },
    ];

    await Job.deleteMany();

    await Job.insertMany(jobs);

    console.log("Jobs seeded successfully");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Job seed error:", error);
    process.exit(1);
  }
};

seedJobs();