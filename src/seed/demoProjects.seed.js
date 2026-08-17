import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Project from "../models/project.model.js";

const commonTechnologies = [
  "React",
  "Vite",
  "Tailwind CSS",
  "Admin Dashboard",
  "Responsive UI"
];

const demoProjects = [
  {
    title: "Hospital Management System",
    slug: "hospital-management-system",
    category: "Healthcare",
    clientName: "CodeCraft.BD Demo",
    shortDescription:
      "A modern hospital management demo for patient, doctor, appointment, billing, and operational workflows.",
    description:
      "This demo presents a hospital management platform designed for clinics, hospitals, and healthcare teams. It shows how patient records, doctor profiles, appointments, billing, dashboards, and operational modules can be organized in a clean web-based system.",
    problem:
      "Healthcare teams often manage appointments, patient details, billing, and reporting across disconnected tools, which creates delays and data inconsistency.",
    solution:
      "The system centralizes core hospital workflows into one responsive dashboard with role-aware modules for patient management, appointments, doctors, billing, and reports.",
    features: [
      "Patient management",
      "Doctor and department management",
      "Appointment scheduling",
      "Billing workflow",
      "Dashboard and reporting",
      "Role-based admin experience"
    ],
    technologies: [...commonTechnologies, "Healthcare Workflow"],
    coverImage:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80"
    ],
    liveUrl: "https://modernhospitalbd.vercel.app",
    githubUrl: "",
    isFeatured: true,
    isActive: true,
    completedAt: new Date("2026-05-01"),
    seoTitle: "Hospital Management System Demo",
    seoDescription:
      "Explore a hospital management system demo for patient records, appointments, doctors, billing, dashboards, and healthcare operations."
  },
  {
    title: "E-Commerce Platform",
    slug: "e-commerce-platform",
    category: "E-commerce",
    clientName: "CodeCraft.BD Demo",
    shortDescription:
      "An e-commerce demo for product catalog, cart, checkout, order, and customer shopping workflows.",
    description:
      "This e-commerce demo shows a modern online store experience with products, categories, shopping flow, cart, checkout, and order-focused structure. It is suitable as a starting reference for retail, fashion, electronics, grocery, and product-based businesses.",
    problem:
      "Many businesses need an online sales channel but struggle with product organization, smooth checkout, order management, and a mobile-friendly buying experience.",
    solution:
      "The platform demonstrates a clean storefront and commerce workflow that can be extended with payment gateways, inventory, customer accounts, order tracking, and admin reporting.",
    features: [
      "Product catalog",
      "Category browsing",
      "Cart and checkout flow",
      "Order-focused structure",
      "Mobile-friendly shopping UI",
      "Admin-ready product workflow"
    ],
    technologies: [...commonTechnologies, "E-commerce Workflow"],
    coverImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop&q=80"
    ],
    liveUrl: "https://ecommerce-gray-eta-80.vercel.app",
    githubUrl: "",
    isFeatured: true,
    isActive: true,
    completedAt: new Date("2026-05-02"),
    seoTitle: "E-Commerce Website Demo",
    seoDescription:
      "View an e-commerce website demo with product catalog, cart, checkout, order workflow, and responsive shopping experience."
  },
  {
    title: "Coaching Management System",
    slug: "coaching-management-system",
    category: "Education",
    clientName: "CodeCraft.BD Demo",
    shortDescription:
      "A coaching center management demo for students, courses, batches, teachers, and academic operations.",
    description:
      "This coaching management demo is built for coaching centers, training institutes, and academies that need to manage students, teachers, courses, batches, admissions, attendance, fees, and academic communication from one dashboard.",
    problem:
      "Coaching centers often manage students, batches, fees, classes, and teacher coordination manually, which makes tracking and reporting difficult.",
    solution:
      "The demo organizes academic operations into a digital dashboard that can be expanded with admissions, attendance, fee collection, class schedules, and reporting.",
    features: [
      "Student management",
      "Course and batch management",
      "Teacher workflow",
      "Admission tracking",
      "Fee and attendance-ready structure",
      "Academic dashboard"
    ],
    technologies: [...commonTechnologies, "Education Workflow"],
    coverImage:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80"
    ],
    liveUrl: "https://academyos-psi.vercel.app",
    githubUrl: "",
    isFeatured: true,
    isActive: true,
    completedAt: new Date("2026-05-03"),
    seoTitle: "Coaching Management Software Demo",
    seoDescription:
      "Explore a coaching management software demo for students, teachers, courses, batches, admissions, attendance, and fees."
  },
  {
    title: "Property and Rent Management System",
    slug: "property-rent-management-system",
    category: "Real Estate",
    clientName: "CodeCraft.BD Demo",
    shortDescription:
      "A rent and property management demo for properties, tenants, rent collection, and rental operations.",
    description:
      "This property and rent management demo is designed for landlords, real estate teams, property managers, and rental businesses. It demonstrates how property records, tenant data, rent cycles, payments, agreements, and maintenance workflows can be handled digitally.",
    problem:
      "Property managers need a better way to track tenants, rent status, property details, agreements, and maintenance without relying on scattered spreadsheets.",
    solution:
      "The system presents a centralized dashboard for property and rent operations with tenant-focused workflows and rental management structure.",
    features: [
      "Property management",
      "Tenant management",
      "Rent tracking workflow",
      "Agreement and payment-ready structure",
      "Maintenance tracking concept",
      "Rental dashboard"
    ],
    technologies: [...commonTechnologies, "Real Estate Workflow"],
    coverImage:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80"
    ],
    liveUrl: "https://rentmasterbd.vercel.app",
    githubUrl: "",
    isFeatured: true,
    isActive: true,
    completedAt: new Date("2026-05-04"),
    seoTitle: "Property and Rent Management Demo",
    seoDescription:
      "View a property and rent management system demo for properties, tenants, rent tracking, rental operations, and dashboards."
  },
  {
    title: "Shop, Product and POS Management System",
    slug: "shop-product-pos-management-system",
    category: "Retail POS",
    clientName: "CodeCraft.BD Demo",
    shortDescription:
      "A shop and POS management demo for products, stock, sales, billing, and retail business operations.",
    description:
      "This shop, product, and POS management demo is built for retail shops and small businesses that need product control, stock tracking, sales workflow, billing, and business reporting from a simple dashboard.",
    problem:
      "Retail businesses need fast product lookup, stock visibility, billing, and sales tracking, but manual records make daily operations slow and error-prone.",
    solution:
      "The POS-focused demo shows how product, inventory, sales, and billing workflows can be digitized into a practical retail management system.",
    features: [
      "Product management",
      "Inventory and stock workflow",
      "POS billing concept",
      "Sales tracking",
      "Shop dashboard",
      "Retail reporting-ready structure"
    ],
    technologies: [...commonTechnologies, "POS Workflow"],
    coverImage:
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&auto=format&fit=crop&q=80"
    ],
    liveUrl: "https://smartdokan.vercel.app",
    githubUrl: "",
    isFeatured: true,
    isActive: true,
    completedAt: new Date("2026-05-05"),
    seoTitle: "Shop Product POS Management Demo",
    seoDescription:
      "Explore a shop, product, and POS management system demo for products, stock, billing, sales tracking, and retail operations."
  },
  {
    title: "School, College and University Management System",
    slug: "school-college-university-management-system",
    category: "Education ERP",
    clientName: "CodeCraft.BD Demo",
    shortDescription:
      "An education management demo for schools, colleges, universities, students, staff, classes, and academic administration.",
    description:
      "This education management demo is designed for schools, colleges, universities, and institutes. It demonstrates how academic administration can be organized through modules for students, teachers, departments, classes, notices, admissions, fees, and reporting.",
    problem:
      "Educational institutions often need one connected system for students, teachers, classes, notices, fees, and administrative reporting.",
    solution:
      "The system demonstrates an institution-ready management platform that can be customized for school, college, university, or training institute workflows.",
    features: [
      "Student management",
      "Teacher and staff management",
      "Class and department workflow",
      "Admission and fee-ready structure",
      "Notice and academic communication",
      "Institution dashboard"
    ],
    technologies: [...commonTechnologies, "Education ERP Workflow"],
    coverImage:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&auto=format&fit=crop&q=80"
    ],
    liveUrl: "https://frii.edu.bd",
    githubUrl: "",
    isFeatured: true,
    isActive: true,
    completedAt: new Date("2026-05-06"),
    seoTitle: "School College University Management Demo",
    seoDescription:
      "View an education management system demo for school, college, university, students, teachers, classes, notices, fees, and dashboards."
  }
];

const seedDemoProjects = async () => {
  await connectDB();

  const results = [];

  for (const project of demoProjects) {
    const savedProject = await Project.findOneAndUpdate(
      { slug: project.slug },
      { $set: project },
      {
        returnDocument: "after",
        runValidators: true,
        setDefaultsOnInsert: true,
        upsert: true
      }
    );

    results.push(savedProject);
  }

  console.log(`Seeded ${results.length} demo projects`);
  results.forEach((project) => {
    console.log(`- ${project.title}: ${project.liveUrl}`);
  });

  await mongoose.connection.close();
};

seedDemoProjects()
  .then(() => process.exit(0))
  .catch(async (error) => {
    console.error(`Demo project seed failed: ${error.message}`);
    await mongoose.connection.close().catch(() => {});
    process.exit(1);
  });
