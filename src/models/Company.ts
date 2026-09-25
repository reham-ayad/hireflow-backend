import mongoose, { Document, Schema } from "mongoose";

export interface ICompany extends Document {
  name: string;
  logo?: string;
  description?: string;
  website?: string;
  location?: string;
  industry?: string;
  employees?: string;
}

const companySchema = new Schema<ICompany>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    logo: {
      type: String,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    website: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    industry: {
      type: String,
      trim: true,
    },

    employees: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model<ICompany>("Company", companySchema);

export default Company;