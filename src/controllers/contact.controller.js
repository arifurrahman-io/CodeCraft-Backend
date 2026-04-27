import mongoose from "mongoose";
import Contact from "../models/contact.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import sendResponse from "../utils/apiResponse.js";

const ensureObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid contact id");
  }
};

export const createContact = asyncHandler(async (req, res) => {
  const contact = await Contact.create(req.body);
  return sendResponse(res, 201, "Message sent successfully", { contact });
});

export const getContacts = asyncHandler(async (req, res) => {
  const query = {};
  if (req.query.status) query.status = req.query.status;

  const contacts = await Contact.find(query).sort({ createdAt: -1 });
  return sendResponse(res, 200, "Contacts fetched successfully", { contacts });
});

export const getContactById = asyncHandler(async (req, res) => {
  ensureObjectId(req.params.id);
  const contact = await Contact.findById(req.params.id);

  if (!contact) throw new ApiError(404, "Contact not found");

  return sendResponse(res, 200, "Contact fetched successfully", { contact });
});

export const updateContactStatus = asyncHandler(async (req, res) => {
  ensureObjectId(req.params.id);
  const { status } = req.body;

  if (!["unread", "read", "replied"].includes(status)) {
    throw new ApiError(400, "Status must be unread, read, or replied");
  }

  const contact = await Contact.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!contact) throw new ApiError(404, "Contact not found");

  return sendResponse(res, 200, "Contact status updated successfully", { contact });
});

export const deleteContact = asyncHandler(async (req, res) => {
  ensureObjectId(req.params.id);
  const contact = await Contact.findByIdAndDelete(req.params.id);

  if (!contact) throw new ApiError(404, "Contact not found");

  return sendResponse(res, 200, "Contact deleted successfully");
});
