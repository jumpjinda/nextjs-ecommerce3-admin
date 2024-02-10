import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Category ||
  mongoose.model("Category", categorySchema);
