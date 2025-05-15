import mongoose from "mongoose"

const PortfolioCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a category name"],
      maxlength: [60, "Name cannot be more than 60 characters"],
    },
    slug: {
      type: String,
      required: [true, "Please provide a category slug"],
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      maxlength: [500, "Description cannot be more than 500 characters"],
    },
  },
  {
    timestamps: true,
  },
)

export const PortfolioCategory =
  mongoose.models.PortfolioCategory || mongoose.model("PortfolioCategory", PortfolioCategorySchema)
