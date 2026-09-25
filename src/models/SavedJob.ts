import mongoose, { Document, Schema } from "mongoose";

export interface ISavedJob extends Document {
  user: mongoose.Types.ObjectId;
  job: mongoose.Types.ObjectId;
}

const savedJobSchema = new Schema<ISavedJob>(
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
  },
  {
    timestamps: true,
  }
);

savedJobSchema.index(
  { user: 1, job: 1 },
  { unique: true }
);

const SavedJob = mongoose.model<ISavedJob>(
  "SavedJob",
  savedJobSchema
);

export default SavedJob;