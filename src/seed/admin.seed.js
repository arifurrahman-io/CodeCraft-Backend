import connectDB from "../config/db.js";
import env from "../config/env.js";
import User from "../models/user.model.js";

const seedAdmin = async () => {
  try {
    await connectDB();

    const email = String(env.admin.email).toLowerCase();
    const existing = await User.findOne({ email });

    if (existing) {
      existing.name = env.admin.name;
      existing.password = env.admin.password;
      existing.role = "admin";
      existing.isActive = true;
      await existing.save();
      console.log(`Admin updated: ${email}`);
    } else {
      await User.create({
        name: env.admin.name,
        email,
        password: env.admin.password,
        role: "admin",
        isActive: true,
      });
      console.log(`Admin created: ${email}`);
    }

    process.exit(0);
  } catch (error) {
    console.error(`Admin seed failed: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
