import mongoose, { Document, Schema } from "mongoose";

export interface IJob extends Document {
  employer: mongoose.Types.ObjectId;
company: mongoose.Types.ObjectId;
  title: string;
  description: string;
  location: string;
  jobType: string;
  salary?: string;
  requirements: string[];
}

const jobSchema = new Schema<IJob>(
  {
    company: {
  type: Schema.Types.ObjectId,
  ref: "Company",
  required: true,
},
    employer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

   

    description: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    jobType: {
      type: String,
      required: true,
      enum: ["Full-time", "Part-time", "Remote", "Internship"],
    },

    salary: {
      type: String,
      trim: true,
    },

    requirements: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model<IJob>("Job", jobSchema);

export default Job;