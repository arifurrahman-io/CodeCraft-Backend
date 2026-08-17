import mongoose from "mongoose";
import Invoice from "../models/invoice.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import sendResponse from "../utils/apiResponse.js";

const ensureObjectId = (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid invoice id");
  }
};

export const getInvoices = asyncHandler(async (req, res) => {
  const query = {};
  if (req.query.status) query.status = req.query.status;

  const invoices = await Invoice.find(query).sort({ createdAt: -1 });
  return sendResponse(res, 200, "Invoices fetched successfully", { invoices });
});

export const getInvoiceById = asyncHandler(async (req, res) => {
  ensureObjectId(req.params.id);
  const invoice = await Invoice.findById(req.params.id);
  
  if (!invoice) throw new ApiError(404, "Invoice not found");

  return sendResponse(res, 200, "Invoice fetched successfully", { invoice });
});

export const createInvoice = asyncHandler(async (req, res) => {
  let invoiceData = { ...req.body };
  
  // Auto-generate invoice number if not provided
  if (!invoiceData.invoiceNumber) {
    const count = await Invoice.countDocuments();
    // Start sequence from 1001 instead of 0001 to hide low counts
    const sequence = String(count + 1001);
    // Add two random uppercase letters for complexity
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const r1 = chars.charAt(Math.floor(Math.random() * chars.length));
    const r2 = chars.charAt(Math.floor(Math.random() * chars.length));
    // Use 2-digit year
    const yearCode = new Date().getFullYear().toString().slice(-2);
    
    invoiceData.invoiceNumber = `INV-${yearCode}${r1}${r2}-${sequence}`;
  }

  const invoice = await Invoice.create(invoiceData);

  return sendResponse(res, 201, "Invoice created successfully", { invoice });
});

export const updateInvoice = asyncHandler(async (req, res) => {
  ensureObjectId(req.params.id);

  const invoice = await Invoice.findById(req.params.id);
  if (!invoice) throw new ApiError(404, "Invoice not found");

  // Overwrite properties
  Object.keys(req.body).forEach(key => {
    invoice[key] = req.body[key];
  });

  // Use save() instead of findByIdAndUpdate to trigger the pre-save hooks (for calculating totals)
  await invoice.save();

  return sendResponse(res, 200, "Invoice updated successfully", { invoice });
});

export const deleteInvoice = asyncHandler(async (req, res) => {
  ensureObjectId(req.params.id);
  const invoice = await Invoice.findByIdAndDelete(req.params.id);

  if (!invoice) throw new ApiError(404, "Invoice not found");

  return sendResponse(res, 200, "Invoice deleted successfully");
});
