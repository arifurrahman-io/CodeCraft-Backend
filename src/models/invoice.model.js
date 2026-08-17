import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema({
  description: {
    type: String,
    required: [true, "Item description is required"],
    trim: true,
  },
  rate: {
    type: Number,
    required: [true, "Item rate is required"],
    min: [0, "Rate cannot be negative"],
  },
  quantity: {
    type: Number,
    required: [true, "Item quantity is required"],
    min: [1, "Quantity must be at least 1"],
  },
  amount: {
    type: Number,
    required: true,
  },
  billingCycle: {
    type: String,
    enum: ["One-time", "Monthly", "Yearly"],
    default: "One-time",
  },
  serviceStartDate: {
    type: Date,
  },
  expirationDate: {
    type: Date,
  },
});

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: [true, "Invoice number is required"],
      unique: true,
      trim: true,
    },
    clientName: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
    },
    clientEmail: {
      type: String,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    clientAddress: {
      type: String,
      trim: true,
    },
    issueDate: {
      type: Date,
      required: [true, "Issue date is required"],
      default: Date.now,
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    items: {
      type: [invoiceItemSchema],
      validate: [
        (val) => val.length > 0,
        "An invoice must have at least one item",
      ],
    },
    subtotal: {
      type: Number,
      required: true,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    balanceDue: {
      type: Number,
      required: true,
      default: 0,
    },
    notes: {
      type: String,
      trim: true,
      default: "Please pay within the due date.",
    },
    terms: {
      type: String,
      trim: true,
      default: "1. Late payments may result in service suspension until outstanding dues are cleared.\n2. Domain registration, renewal, hosting fees, and third-party service charges are non-refundable once processed.\n3. Additional work beyond the approved scope will be billed separately.\n4. Ownership of project deliverables will be transferred upon full payment of all invoices.\n5. The company shall not be liable for losses arising from third-party service outages, domain expiration, cyberattacks, or force majeure events.",
    },
    status: {
      type: String,
      enum: ["Draft", "Sent", "Paid", "Overdue", "Cancelled"],
      default: "Draft",
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to calculate totals and dates
invoiceSchema.pre("save", function () {
  // Calculate amounts and dates for each item
  this.items.forEach((item) => {
    item.amount = item.rate * item.quantity;

    if (item.serviceStartDate) {
      const startDate = new Date(item.serviceStartDate);
      if (item.billingCycle === "Monthly") {
        startDate.setMonth(startDate.getMonth() + 1);
        item.expirationDate = startDate;
      } else if (item.billingCycle === "Yearly") {
        startDate.setFullYear(startDate.getFullYear() + 1);
        item.expirationDate = startDate;
      }
    }
  });

  // Calculate subtotal
  this.subtotal = this.items.reduce((sum, item) => sum + item.amount, 0);

  // Calculate total
  this.total = this.subtotal + this.tax - this.discount;

  // Calculate balance due
  this.balanceDue = this.total - this.paidAmount;

  // Auto-update status if fully paid and not cancelled
  if (this.status !== "Cancelled") {
    if (this.balanceDue <= 0 && this.total > 0) {
      this.status = "Paid";
    } else if (this.status === "Paid" && this.balanceDue > 0) {
      if (this.isModified("status")) {
        // If user manually changed status to Paid, auto-fill paidAmount
        this.paidAmount = this.total;
        this.balanceDue = 0;
      } else {
        // Reverted from paid
        this.status = "Sent";
      }
    }
  }
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
