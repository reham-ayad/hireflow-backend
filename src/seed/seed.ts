import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "../models/User";
import Company from "../models/Company";
import Job from "../models/Job";
import Application from "../models/Application";
import Notification from "../models/Notification";
import SavedJob from "../models/SavedJob";

const MONGODB_URI = process.env.MONGODB_URI as string;

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log("MongoDB connected");

    // Clear existing data
    await Notification.deleteMany({});
    await SavedJob.deleteMany({});
    await Application.deleteMany({});
    await Job.deleteMany({});
    await Company.deleteMany({});
    await User.deleteMany({});

    console.log("Old data cleared");

    // =========================
    // PASSWORD
    // =========================

    const hashedPassword = await bcrypt.hash("123456", 10);

    // =========================
    // USERS
    // =========================

    const employers = await User.insertMany([
      {
        name: "Ahmed Hassan",
        email: "ahmed@greencore.com",
        password: hashedPassword,
        phone: "01011111111",
        location: "Cairo, Egypt",
        jobTitle: "HR Manager",
        bio: "HR Manager at GreenCore Energy.",
        role: "employer",
      },
      {
        name: "Mariam Ali",
        email: "mariam@technova.com",
        password: hashedPassword,
        phone: "01022222222",
        location: "Giza, Egypt",
        jobTitle: "Talent Acquisition Manager",
        bio: "Talent Acquisition Manager at TechNova.",
        role: "employer",
      },
      {
        name: "Omar Khaled",
        email: "omar@devsphere.com",
        password: hashedPassword,
        phone: "01033333333",
        location: "New Cairo, Egypt",
        jobTitle: "Engineering Manager",
        bio: "Engineering Manager at DevSphere.",
        role: "employer",
      },
    ]);

    const candidates = await User.insertMany([
      {
        name: "Reham Ayad",
        email: "reham@example.com",
        password: hashedPassword,
        phone: "01044444444",
        location: "Menoufia, Egypt",
        jobTitle: "Angular & Node.js Developer",
        bio: "Full-stack developer specialized in Angular and Node.js.",
        skills: [
          "Angular",
          "TypeScript",
          "JavaScript",
          "Node.js",
          "Express.js",
          "MongoDB",
        ],
        resume: "reham-resume.pdf",
        role: "candidate",
      },
      {
        name: "Sara Mohamed",
        email: "sara@example.com",
        password: hashedPassword,
        phone: "01055555555",
        location: "Cairo, Egypt",
        jobTitle: "Frontend Developer",
        bio: "Frontend developer focused on modern web applications.",
        skills: ["Angular", "TypeScript", "HTML", "CSS", "Bootstrap"],
        resume: "sara-resume.pdf",
        role: "candidate",
      },
      {
        name: "Youssef Ahmed",
        email: "youssef@example.com",
        password: hashedPassword,
        phone: "01066666666",
        location: "Giza, Egypt",
        jobTitle: "Backend Developer",
        bio: "Backend developer working with Node.js and databases.",
        skills: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
        resume: "youssef-resume.pdf",
        role: "candidate",
      },
      {
        name: "Nour Hassan",
        email: "nour@example.com",
        password: hashedPassword,
        phone: "01077777777",
        location: "Alexandria, Egypt",
        jobTitle: "UI/UX Designer",
        bio: "Creative UI/UX designer interested in digital products.",
        skills: ["Figma", "UI Design", "UX Research", "Prototyping"],
        resume: "nour-resume.pdf",
        role: "candidate",
      },
      {
        name: "Karim Mostafa",
        email: "karim@example.com",
        password: hashedPassword,
        phone: "01088888888",
        location: "Cairo, Egypt",
        jobTitle: "Full Stack Developer",
        bio: "Full-stack developer building scalable web applications.",
        skills: [
          "Angular",
          "Node.js",
          "TypeScript",
          "MongoDB",
          "Express.js",
        ],
        resume: "karim-resume.pdf",
        role: "candidate",
      },
      {
        name: "Mona Adel",
        email: "mona@example.com",
        password: hashedPassword,
        phone: "01099999999",
        location: "Mansoura, Egypt",
        jobTitle: "Software Developer",
        bio: "Software developer interested in web technologies.",
        skills: ["JavaScript", "TypeScript", "Angular", "Git"],
        resume: "mona-resume.pdf",
        role: "candidate",
      },
    ]);

    console.log("Users created");

    // =========================
    // COMPANIES
    // =========================

    const companies = await Company.insertMany([
      {
        owner: employers[0]._id,
        name: "GreenCore Energy",
        logo: "company11.png",
        description:
          "GreenCore Energy is a growing renewable energy company building innovative digital solutions.",
        website: "https://greencore.example.com",
        location: "New Cairo, Egypt",
        industry: "Renewable Energy",
        employees: "500-1000",
      },
      {
        owner: employers[1]._id,
        name: "TechNova",
        logo: "company12.png",
        description:
          "TechNova provides modern software solutions for businesses across the region.",
        website: "https://technova.example.com",
        location: "Giza, Egypt",
        industry: "Software & Technology",
        employees: "100-500",
      },
      {
        owner: employers[2]._id,
        name: "DevSphere",
        logo: "company13.png",
        description:
          "DevSphere is a software company focused on web applications and cloud technologies.",
        website: "https://devsphere.example.com",
        location: "Cairo, Egypt",
        industry: "Software Development",
        employees: "50-100",
      },
    ]);

    console.log("Companies created");

    // =========================
    // JOBS
    // =========================

    const jobs = await Job.insertMany([
      {
        employer: employers[0]._id,
        company: companies[0]._id,
        title: "Angular Developer",
        description:
          "We are looking for an Angular Developer to build modern and scalable web applications.",
        location: "New Cairo, Egypt",
        jobType: "Full-time",
        salary: "20,000 - 30,000 EGP",
        requirements: [
          "Angular",
          "TypeScript",
          "JavaScript",
          "HTML",
          "CSS",
          "Git",
        ],
      },
      {
        employer: employers[0]._id,
        company: companies[0]._id,
        title: "Node.js Backend Developer",
        description:
          "Build REST APIs and backend services using Node.js and Express.",
        location: "Cairo, Egypt",
        jobType: "Full-time",
        salary: "22,000 - 32,000 EGP",
        requirements: [
          "Node.js",
          "Express.js",
          "MongoDB",
          "REST APIs",
          "Git",
        ],
      },
      {
        employer: employers[0]._id,
        company: companies[0]._id,
        title: "Frontend Developer",
        description:
          "Join our frontend team and create responsive user interfaces.",
        location: "Remote",
        jobType: "Remote",
        salary: "18,000 - 28,000 EGP",
        requirements: ["Angular", "TypeScript", "SCSS", "Responsive Design"],
      },

      {
        employer: employers[1]._id,
        company: companies[1]._id,
        title: "Full Stack Developer",
        description:
          "Develop complete web applications using Angular and Node.js.",
        location: "Giza, Egypt",
        jobType: "Full-time",
        salary: "25,000 - 35,000 EGP",
        requirements: [
          "Angular",
          "Node.js",
          "TypeScript",
          "MongoDB",
          "Express.js",
        ],
      },
      {
        employer: employers[1]._id,
        company: companies[1]._id,
        title: "Junior Angular Developer",
        description:
          "Work with our frontend team to develop modern Angular applications.",
        location: "Giza, Egypt",
        jobType: "Full-time",
        salary: "15,000 - 22,000 EGP",
        requirements: ["Angular", "TypeScript", "HTML", "CSS", "Git"],
      },
      {
        employer: employers[1]._id,
        company: companies[1]._id,
        title: "UI/UX Designer",
        description:
          "Design intuitive user experiences and modern interfaces.",
        location: "Cairo, Egypt",
        jobType: "Full-time",
        salary: "15,000 - 25,000 EGP",
        requirements: ["Figma", "UI Design", "UX", "Prototyping"],
      },

      {
        employer: employers[2]._id,
        company: companies[2]._id,
        title: "Backend Developer",
        description:
          "Develop scalable backend services and RESTful APIs.",
        location: "New Cairo, Egypt",
        jobType: "Full-time",
        salary: "20,000 - 30,000 EGP",
        requirements: ["Node.js", "Express.js", "MongoDB", "REST APIs"],
      },
      {
        employer: employers[2]._id,
        company: companies[2]._id,
        title: "Software Engineer",
        description:
          "Work on scalable software products and backend services.",
        location: "Cairo, Egypt",
        jobType: "Full-time",
        salary: "22,000 - 32,000 EGP",
        requirements: ["JavaScript", "TypeScript", "Node.js", "Git"],
      },
      {
        employer: employers[2]._id,
        company: companies[2]._id,
        title: "Junior Web Developer",
        description:
          "Entry-level position for developers interested in modern web technologies.",
        location: "Remote",
        jobType: "Remote",
        salary: "12,000 - 18,000 EGP",
        requirements: ["JavaScript", "HTML", "CSS", "Git"],
      },
    ]);

    console.log("Jobs created");

    // =========================
    // APPLICATIONS
    // =========================

    const applications = await Application.insertMany([
      {
        user: candidates[0]._id,
        job: jobs[0]._id,
        fullName: candidates[0].name,
        email: candidates[0].email,
        phone: candidates[0].phone,
        location: candidates[0].location,
        jobTitle: candidates[0].jobTitle,
        skills: candidates[0].skills,
        resume: candidates[0].resume,
        coverLetter:
          "I am excited to apply for the Angular Developer position. I believe my Angular and TypeScript skills make me a strong candidate.",
        status: "Pending",
      },
      {
        user: candidates[1]._id,
        job: jobs[0]._id,
        fullName: candidates[1].name,
        email: candidates[1].email,
        phone: candidates[1].phone,
        location: candidates[1].location,
        jobTitle: candidates[1].jobTitle,
        skills: candidates[1].skills,
        resume: candidates[1].resume,
        coverLetter:
          "I would love to join your frontend team and contribute to building modern web applications.",
        status: "Reviewing",
      },
      {
        user: candidates[2]._id,
        job: jobs[1]._id,
        fullName: candidates[2].name,
        email: candidates[2].email,
        phone: candidates[2].phone,
        location: candidates[2].location,
        jobTitle: candidates[2].jobTitle,
        skills: candidates[2].skills,
        resume: candidates[2].resume,
        coverLetter:
          "I am interested in the Node.js Backend Developer position and would be happy to contribute to your team.",
        status: "Accepted",
      },
      {
        user: candidates[3]._id,
        job: jobs[5]._id,
        fullName: candidates[3].name,
        email: candidates[3].email,
        phone: candidates[3].phone,
        location: candidates[3].location,
        jobTitle: candidates[3].jobTitle,
        skills: candidates[3].skills,
        resume: candidates[3].resume,
        coverLetter:
          "I am passionate about creating intuitive and user-friendly digital experiences.",
        status: "Rejected",
      },
      {
        user: candidates[4]._id,
        job: jobs[3]._id,
        fullName: candidates[4].name,
        email: candidates[4].email,
        phone: candidates[4].phone,
        location: candidates[4].location,
        jobTitle: candidates[4].jobTitle,
        skills: candidates[4].skills,
        resume: candidates[4].resume,
        coverLetter:
          "I am interested in the Full Stack Developer role and have experience with Angular and Node.js.",
        status: "Interviewing",
      },
      {
        user: candidates[5]._id,
        job: jobs[4]._id,
        fullName: candidates[5].name,
        email: candidates[5].email,
        phone: candidates[5].phone,
        location: candidates[5].location,
        jobTitle: candidates[5].jobTitle,
        skills: candidates[5].skills,
        resume: candidates[5].resume,
        coverLetter:
          "I would like to be considered for the Junior Angular Developer position.",
        status: "Pending",
      },
    ]);

    console.log("Applications created");

    // =========================
    // SAVED JOBS
    // =========================

    await SavedJob.insertMany([
      {
        user: candidates[0]._id,
        job: jobs[3]._id,
      },
      {
        user: candidates[0]._id,
        job: jobs[6]._id,
      },
      {
        user: candidates[1]._id,
        job: jobs[4]._id,
      },
      {
        user: candidates[4]._id,
        job: jobs[0]._id,
      },
    ]);

    console.log("Saved jobs created");

    // =========================
    // NOTIFICATIONS
    // =========================

    await Notification.insertMany([
      {
        user: candidates[0]._id,
        type: "application_status",
        title: "Application Submitted",
        message:
          "Your application for Angular Developer has been submitted successfully.",
        application: applications[0]._id,
        read: false,
      },
      {
        user: candidates[1]._id,
        type: "application_status",
        title: "Application Under Review",
        message:
          "Your application for Angular Developer is currently being reviewed.",
        application: applications[1]._id,
        read: false,
      },
      {
        user: candidates[2]._id,
        type: "application_status",
        title: "Application Accepted",
        message:
          "Congratulations! Your application for Node.js Backend Developer has been accepted.",
        application: applications[2]._id,
        read: false,
      },
      {
        user: candidates[3]._id,
        type: "application_status",
        title: "Application Update",
        message:
          "Your application status has been updated.",
        application: applications[3]._id,
        read: true,
      },
    ]);

    console.log("Notifications created");

    console.log("\n==============================");
    console.log("DATABASE SEEDED SUCCESSFULLY");
    console.log("==============================\n");

    console.log("Login credentials:");
    console.log("Password for all users: 123456\n");

    console.log("Employers:");
    console.log("ahmed@greencore.com");
    console.log("mariam@technova.com");
    console.log("omar@devsphere.com\n");

    console.log("Candidates:");
    console.log("reham@example.com");
    console.log("sara@example.com");
    console.log("youssef@example.com");
    console.log("nour@example.com");
    console.log("karim@example.com");
    console.log("mona@example.com");

    await mongoose.disconnect();
  } catch (error) {
    console.error("Seed error:", error);

    await mongoose.disconnect();

    process.exit(1);
  }
};

seedDatabase();