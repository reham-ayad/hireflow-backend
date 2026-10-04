import mongoose, { Document, Schema } from "mongoose";

export interface IApplication extends Document {
  user: mongoose.Types.ObjectId;
  job: mongoose.Types.ObjectId;

  fullName: string;
  email: string;
  phone: string;
  location: string;
  jobTitle: string;
  skills: string[];
  resume: string;
  coverLetter: string;

  status: "Pending" | "Accepted" | "Rejected";
}

const applicationSchema = new Schema<IApplication>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    job: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    jobTitle: {
      type: String,
      required: true,
      trim: true,
    },

    skills: {
      type: [String],
      required: true,
      default: [],
    },

    resume: {
      type: String,
      required: true,
      trim: true,
    },

    coverLetter: {
      type: String,
      required: true,
      trim: true,
    },
status: {
  type: String,
  enum: ["Pending", "Reviewing", "Interviewing", "Accepted", "Rejected"],
  default: "Pending",
},

  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model<IApplication>(
  "Application",
  applicationSchema
);

export default Application;