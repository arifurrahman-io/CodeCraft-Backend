import mongoose from "mongoose";

const educationSchema = new mongoose.Schema(
  {
    degreeOrExamName: {
      type: String,
      required: [true, "Degree or exam name is required"],
      trim: true
    },
    groupOrSubject: {
      type: String,
      default: "",
      trim: true
    },
    institutionName: {
      type: String,
      required: [true, "Institution name is required"],
      trim: true
    },
    boardOrUniversity: {
      type: String,
      default: "",
      trim: true
    },
    passingYear: {
      type: String,
      required: [true, "Passing year is required"],
      trim: true
    },
    gpaOrCgpa: {
      type: String,
      default: "",
      trim: true
    }
  },
  { _id: false }
);

const trainingSchema = new mongoose.Schema(
  {
    trainingTitle: {
      type: String,
      default: "",
      trim: true
    },
    organizationName: {
      type: String,
      default: "",
      trim: true
    },
    durationOrYear: {
      type: String,
      default: "",
      trim: true
    }
  },
  { _id: false }
);

const languageSchema = new mongoose.Schema(
  {
    languageName: {
      type: String,
      default: "",
      trim: true
    },
    proficiencyLevel: {
      type: String,
      default: "",
      trim: true
    }
  },
  { _id: false }
);

const referenceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
      trim: true
    },
    designation: {
      type: String,
      default: "",
      trim: true
    },
    organization: {
      type: String,
      default: "",
      trim: true
    },
    mobileNumber: {
      type: String,
      default: "",
      trim: true
    },
    emailAddress: {
      type: String,
      default: "",
      lowercase: true,
      trim: true
    },
    relationship: {
      type: String,
      default: "",
      trim: true
    }
  },
  { _id: false }
);

const cvSubmissionSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      maxlength: [160, "Full name cannot exceed 160 characters"]
    },
    dateOfBirth: {
      type: Date,
      default: null
    },
    nationality: {
      type: String,
      default: "",
      trim: true
    },
    nationalIdNumber: {
      type: String,
      default: "",
      trim: true
    },
    religion: {
      type: String,
      default: "",
      trim: true
    },
    maritalStatus: {
      type: String,
      default: "",
      trim: true
    },
    gender: {
      type: String,
      enum: ["", "Male", "Female"],
      default: "",
      trim: true
    },
    bloodGroup: {
      type: String,
      default: "",
      trim: true
    },
    presentAddress: {
      type: String,
      required: [true, "Present address is required"],
      trim: true
    },
    mobileNumber: {
      type: String,
      required: [true, "Mobile number is required"],
      trim: true
    },
    emailAddress: {
      type: String,
      required: [true, "Email address is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"]
    },
    professionalSummary: {
      type: String,
      required: [true, "Professional summary is required"],
      trim: true
    },
    employmentHistory: {
      type: String,
      default: "",
      trim: true
    },
    educationalQualifications: {
      type: [educationSchema],
      required: [true, "Educational qualifications are required"],
      validate: {
        validator(value) {
          return Array.isArray(value) && value.length > 0;
        },
        message: "At least one educational qualification is required"
      }
    },
    technicalSkills: {
      type: String,
      default: "",
      trim: true
    },
    professionalSkills: {
      type: String,
      default: "",
      trim: true
    },
    trainingAndCertifications: {
      type: [trainingSchema],
      default: []
    },
    languageProficiency: {
      type: [languageSchema],
      default: []
    },
    extraCurricularActivities: {
      type: String,
      default: "",
      trim: true
    },
    achievementsAndAwards: {
      type: String,
      default: "",
      trim: true
    },
    references: {
      type: [referenceSchema],
      default: [],
      validate: {
        validator(value) {
          return !Array.isArray(value) || value.length <= 2;
        },
        message: "References cannot exceed 2 people"
      }
    },
    status: {
      type: String,
      enum: ["new", "reviewing", "shortlisted", "rejected"],
      default: "new"
    }
  },
  { timestamps: true }
);

cvSubmissionSchema.index({ status: 1, createdAt: -1 });
cvSubmissionSchema.index({ emailAddress: 1, createdAt: -1 });

const CvSubmission = mongoose.model("CvSubmission", cvSubmissionSchema);

export default CvSubmission;
