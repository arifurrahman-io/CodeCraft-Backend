import Service from "../models/service.model.js";
import Project from "../models/project.model.js";
import Blog from "../models/blog.model.js";
import Team from "../models/team.model.js";
import Testimonial from "../models/testimonial.model.js";
import Contact from "../models/contact.model.js";
import CvSubmission from "../models/cvSubmission.model.js";
import Invoice from "../models/invoice.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import sendResponse from "../utils/apiResponse.js";

export const getDashboardStats = asyncHandler(async (_req, res) => {
  const [
    totalServices,
    totalProjects,
    totalBlogs,
    totalTeamMembers,
    totalTestimonials,
    totalMessages,
    unreadMessages,
    totalCvSubmissions,
    newCvSubmissions,
    totalInvoices,
    unpaidInvoices,
    recentMessages,
    recentProjects
  ] = await Promise.all([
    Service.countDocuments(),
    Project.countDocuments(),
    Blog.countDocuments(),
    Team.countDocuments(),
    Testimonial.countDocuments(),
    Contact.countDocuments(),
    Contact.countDocuments({ status: "unread" }),
    CvSubmission.countDocuments(),
    CvSubmission.countDocuments({ status: "new" }),
    Invoice.countDocuments(),
    Invoice.countDocuments({ status: { $in: ["Draft", "Sent", "Overdue"] } }),
    Contact.find().sort({ createdAt: -1 }).limit(5),
    Project.find().sort({ createdAt: -1 }).limit(5)
  ]);

  return sendResponse(res, 200, "Dashboard stats fetched successfully", {
    totalServices,
    totalProjects,
    totalBlogs,
    totalTeamMembers,
    totalTestimonials,
    totalMessages,
    unreadMessages,
    totalCvSubmissions,
    newCvSubmissions,
    totalInvoices,
    unpaidInvoices,
    recentMessages,
    recentProjects
  });
});
