import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, "Client name is required"],
      trim: true
    },
    company: {
      type: String,
      default: "",
      trim: true
    },
    designation: {
      type: String,
      default: "",
      trim: true
    },
    photo: {
      type: String,
      default: ""
    },
    review: {
      type: String,
      required: [true, "Review is required"],
      trim: true
    },
    rating: {
      type: Number,
      default: 5,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"]
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

testimonialSchema.index({ isActive: 1, order: 1 });

const Testimonial = mongoose.model("Testimonial", testimonialSchema);

export default Testimonial;
