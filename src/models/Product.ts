import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    brand: {
      type: String,
    },
    category: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);
