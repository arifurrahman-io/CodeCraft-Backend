import { isArray, isEmail, isIn, isRequired } from "../middleware/validate.middleware.js";

export const invoiceValidation = [
  isRequired("clientName", "Client name"),
  isEmail("clientEmail", "Client email"),
  isRequired("dueDate", "Due date"),
  isArray("items", "Items"),
  isIn(
    "status",
    ["Draft", "Sent", "Paid", "Overdue", "Cancelled"],
    "Status"
  ),
  (req) => {
    if (!Array.isArray(req.body.items) || req.body.items.length === 0) {
      return "An invoice must have at least one item";
    }
    return null;
  }
];
