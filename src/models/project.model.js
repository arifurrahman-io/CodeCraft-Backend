import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
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
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true
    },
    clientName: {
      type: String,
      default: "",
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
    problem: {
      type: String,
      default: ""
    },
    solution: {
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
    coverImage: {
      type: String,
      default: ""
    },
    images: {
      type: [String],
      default: []
    },
    liveUrl: {
      type: String,
      default: ""
    },
    githubUrl: {
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
    completedAt: {
      type: Date,
      default: null
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

projectSchema.index({ isActive: 1, isFeatured: 1, createdAt: -1 });
projectSchema.index({ title: "text", shortDescription: "text", description: "text", category: "text" });

const Project = mongoose.model("Project", projectSchema);

export default Project;
