import express from "express";
import {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice
} from "../controllers/invoice.controller.js";
import protect from "../middleware/auth.middleware.js";
import authorize from "../middleware/role.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { invoiceValidation } from "../validations/invoice.validation.js";

const router = express.Router();
const manage = [protect, authorize("admin", "editor")];

router.use(...manage);

router
  .route("/")
  .get(getInvoices)
  .post(validate(invoiceValidation), createInvoice);

router
  .route("/:id")
  .get(getInvoiceById)
  .put(validate(invoiceValidation), updateInvoice)
  .delete(deleteInvoice);

export default router;
