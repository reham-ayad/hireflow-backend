import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;

  phone?: string;
  location?: string;
  jobTitle?: string;
  bio?: string;
  skills?: string[];
  resume?: string;
  profileImage?: string;
  role: "candidate" | "employer";
}

const userSchema = new Schema<IUser>(
  {
    // Authentication data
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    // Profile data
    phone: {
      type: String,
      trim: true,
    },

    location: {
      type: String,
      trim: true,
    },

    jobTitle: {
      type: String,
      trim: true,
    },

    bio: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    skills: {
      type: [String],
      default: [],
    },

    resume: {
      type: String,
      trim: true,
    },

    profileImage: {
      type: String,
      trim: true,
    },
    role: {
  type: String,
  enum: ["candidate", "employer"],
  required: true,
  default: "candidate",
},
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;