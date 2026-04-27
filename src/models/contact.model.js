import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [120, "Name cannot exceed 120 characters"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"]
    },
    phone: {
      type: String,
      default: "",
      trim: true
    },
    company: {
      type: String,
      default: "",
      trim: true
    },
    projectType: {
      type: String,
      default: "",
      trim: true
    },
    budgetRange: {
      type: String,
      default: "",
      trim: true
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true
    },
    status: {
      type: String,
      enum: ["unread", "read", "replied"],
      default: "unread"
    }
  },
  { timestamps: true }
);

contactSchema.index({ status: 1, createdAt: -1 });

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
