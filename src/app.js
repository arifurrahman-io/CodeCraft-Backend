import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import env, { isProduction } from "./config/env.js";
import ApiError from "./utils/apiError.js";
import errorMiddleware from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import projectRoutes from "./routes/project.routes.js";
import blogRoutes from "./routes/blog.routes.js";
import teamRoutes from "./routes/team.routes.js";
import testimonialRoutes from "./routes/testimonial.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import settingsRoutes from "./routes/settings.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import cvSubmissionRoutes from "./routes/cvSubmission.routes.js";
import aiChatRoutes from "./routes/aiChat.routes.js";
import invoiceRoutes from "./routes/invoice.routes.js";

const app = express();

if (isProduction) {
  app.set("trust proxy", 1);
}

app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  }),
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        if (isProduction) {
          callback(null, false);
          return;
        }
        callback(null, true);
        return;
      }

      if (env.corsOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(null, false);
    },
    credentials: true,
  }),
);

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));
app.use(cookieParser());

app.use(
  "/api/v1",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 600,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: "Too many requests. Please try again later.",
    },
  }),
);

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "CodeCraft.BD API is running",
  });
});

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API health check passed",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/services", serviceRoutes);
app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/team", teamRoutes);
app.use("/api/v1/testimonials", testimonialRoutes);
app.use("/api/v1/contacts", contactRoutes);
app.use("/api/v1/settings", settingsRoutes);
app.use("/api/v1/upload", uploadRoutes);
app.use("/api/v1/cv-submissions", cvSubmissionRoutes);
app.use("/api/v1/ai-chat", aiChatRoutes);
app.use("/api/v1/invoices", invoiceRoutes);

app.use((req, _res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
});

app.use(errorMiddleware);

export default app;
