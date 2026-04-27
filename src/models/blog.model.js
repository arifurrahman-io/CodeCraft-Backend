import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
      maxlength: [180, "Title cannot exceed 180 characters"]
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      trim: true,
      maxlength: [400, "Excerpt cannot exceed 400 characters"]
    },
    content: {
      type: String,
      required: [true, "Content is required"]
    },
    coverImage: {
      type: String,
      default: ""
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true
    },
    tags: {
      type: [String],
      default: []
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    views: {
      type: Number,
      default: 0,
      min: 0
    },
    isPublished: {
      type: Boolean,
      default: false
    },
    publishedAt: {
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

blogSchema.index({ isPublished: 1, publishedAt: -1 });
blogSchema.index({ title: "text", excerpt: "text", content: "text", category: "text", tags: "text" });

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
