import dotenv from "dotenv";

dotenv.config();

const toList = (value) =>
  String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const defaultCorsOrigins = [
  "https://codecraft.bd",
  "https://www.codecraft.bd",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
const corsOrigins = [
  ...defaultCorsOrigins,
  ...toList(clientUrl),
  ...toList(process.env.CORS_ORIGINS),
];

const env = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  clientUrl,
  corsOrigins: [...new Set(corsOrigins)],
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY,
    model: process.env.AI_MODEL || "gpt-5-mini",
  },
  assistant: {
    provider: process.env.AI_ASSISTANT_PROVIDER || "faq",
  },
  admin: {
    name: process.env.ADMIN_NAME || "Admin",
    email: process.env.ADMIN_EMAIL || "admin@codecraft.bd",
    password: process.env.ADMIN_PASSWORD || "123456",
  },
};

export const isProduction = env.nodeEnv === "production";

export const validateServerEnv = () => {
  const missing = [];

  if (!env.mongoUri) missing.push("MONGO_URI");
  if (!env.jwtSecret) missing.push("JWT_SECRET");

  if (missing.length) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`,
    );
  }

  if (isProduction) {
    if (String(env.jwtSecret).length < 32) {
      throw new Error(
        "JWT_SECRET must be at least 32 characters in production",
      );
    }

    if (
      !process.env.ADMIN_PASSWORD ||
      process.env.ADMIN_PASSWORD === "123456" ||
      String(process.env.ADMIN_PASSWORD).length < 10
    ) {
      throw new Error(
        "ADMIN_PASSWORD must be set to a strong value (10+ chars) in production; do not use the default",
      );
    }
  }
};

export const hasCloudinaryConfig = () =>
  Boolean(
    env.cloudinary.cloudName &&
      env.cloudinary.apiKey &&
      env.cloudinary.apiSecret,
  );

export default env;
