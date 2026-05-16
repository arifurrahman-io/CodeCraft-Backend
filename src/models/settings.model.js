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
      default: "",
      trim: true
    },
    favicon: {
      type: String,
      default: "",
      trim: true
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
    website: {
      type: String,
      default: "",
      trim: true
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
    },
    keywords: {
      type: String,
      default: "",
      trim: true
    },
    ogImage: {
      type: String,
      default: "",
      trim: true
    },
    primaryColor: {
      type: String,
      default: "#06b6d4",
      trim: true
    },
    secondaryColor: {
      type: String,
      default: "#1e293b",
      trim: true
    },
    accentColor: {
      type: String,
      default: "#8b5cf6",
      trim: true
    },
    statistics: {
      yearsExperience: {
        type: String,
        default: "",
        trim: true
      },
      businessStartYear: {
        type: String,
        default: "2019",
        trim: true
      },
      projectsCompleted: {
        type: String,
        default: "",
        trim: true
      },
      happyClients: {
        type: String,
        default: "",
        trim: true
      },
      industriesServed: {
        type: String,
        default: "",
        trim: true
      },
      expertsTeam: {
        type: String,
        default: "",
        trim: true
      },
      projectSuccess: {
        type: String,
        default: "100%",
        trim: true
      },
      supportAvailability: {
        type: String,
        default: "24/7",
        trim: true
      }
    }
  },
  { timestamps: true }
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
