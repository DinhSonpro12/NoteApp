import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    folderId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const NoterModel = mongoose.model("Note", noteSchema);
export default NoterModel;
