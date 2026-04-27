import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Team member name is required"],
      trim: true,
      maxlength: [120, "Name cannot exceed 120 characters"]
    },
    designation: {
      type: String,
      required: [true, "Designation is required"],
      trim: true
    },
    photo: {
      type: String,
      default: ""
    },
    bio: {
      type: String,
      default: ""
    },
    skills: {
      type: [String],
      default: []
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
    website: {
      type: String,
      default: ""
    },
    isActive: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

teamSchema.index({ isActive: 1, order: 1 });

const Team = mongoose.model("Team", teamSchema);

export default Team;
