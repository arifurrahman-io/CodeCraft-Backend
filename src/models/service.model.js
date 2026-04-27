import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Service title is required"],
      trim: true,
      maxlength: [160, "Title cannot exceed 160 characters"]
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    shortDescription: {
      type: String,
      required: [true, "Short description is required"],
      trim: true,
      maxlength: [300, "Short description cannot exceed 300 characters"]
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true
    },
    icon: {
      type: String,
      default: ""
    },
    image: {
      type: String,
      default: ""
    },
    features: {
      type: [String],
      default: []
    },
    technologies: {
      type: [String],
      default: []
    },
    priceRange: {
      type: String,
      default: ""
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    isActive: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      default: 0
    },
    seoTitle: {
      type: String,
      default: ""
    },
    seoDescription: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

serviceSchema.index({ isActive: 1, order: 1 });
serviceSchema.index({ title: "text", shortDescription: "text", description: "text" });

const Service = mongoose.model("Service", serviceSchema);

export default Service;
