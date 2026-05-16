import { isEmail, isIn, isRequired } from "../middleware/validate.middleware.js";

const hasEducation = (req) => {
  const qualifications = req.body.educationalQualifications;

  if (!Array.isArray(qualifications) || qualifications.length === 0) {
    return "At least one educational qualification is required";
  }

  const invalid = qualifications.some(
    (item) =>
      !item?.degreeOrExamName ||
      !item?.institutionName ||
      !item?.passingYear
  );

  return invalid
    ? "Each educational qualification needs degree/exam, institution, and passing year"
    : null;
};

const maxTwoReferences = (req) => {
  const references = req.body.references;

  if (Array.isArray(references) && references.length > 2) {
    return "References cannot exceed 2 people";
  }

  return null;
};

export const cvSubmissionValidation = [
  isRequired("fullName", "Full name"),
  isRequired("presentAddress", "Present address"),
  isRequired("mobileNumber", "Mobile number"),
  isRequired("emailAddress", "Email address"),
  isEmail("emailAddress", "Email address"),
  isIn("gender", ["", "Male", "Female"], "Gender"),
  isRequired("professionalSummary", "Professional summary"),
  hasEducation,
  maxTwoReferences
];
