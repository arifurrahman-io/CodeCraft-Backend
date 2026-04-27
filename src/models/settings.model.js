import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      default: "CodeCraft.BD",
      trim: true
    },
    tagline: {
      type: String,
      default: "",
      trim: true
    },
    logo: {
      type: String,
      default: ""
    },
    favicon: {
      type: String,
      default: ""
    },
    email: {
      type: String,
      default: "",
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      default: "",
      trim: true
    },
    address: {
      type: String,
      default: ""
    },
    facebook: {
      type: String,
      default: ""
    },
    linkedin: {
      type: String,
      default: ""
    },
    github: {
      type: String,
      default: ""
    },
    twitter: {
      type: String,
      default: ""
    },
    heroTitle: {
      type: String,
      default: "Build better digital products with CodeCraft.BD"
    },
    heroSubtitle: {
      type: String,
      default: ""
    },
    footerText: {
      type: String,
      default: ""
    },
    seoTitle: {
      type: String,
      default: "CodeCraft.BD"
    },
    seoDescription: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
