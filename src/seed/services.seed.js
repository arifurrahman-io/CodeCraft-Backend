import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Service from "../models/service.model.js";

const services = [
  {
    title: "Web Application Development",
    slug: "web-application-development",
    shortDescription:
      "Custom responsive websites and web applications built for business growth, speed, security, and usability.",
    description:
      "CodeCraft.BD builds modern websites and custom web applications for businesses, startups, agencies, institutions, and service providers. This service covers business websites, landing pages, company profiles, portals, dashboards, and full custom web apps with frontend, backend, database, admin panel, and deployment support. Every build is planned around the client workflow, target users, content, conversion goals, performance, mobile responsiveness, and future maintainability.",
    icon: "Globe",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
    features: [
      "Responsive website and web app development",
      "Custom frontend and backend implementation",
      "Contact forms and lead collection",
      "Admin panel and content management options",
      "SEO-friendly structure and performance basics",
      "Deployment and launch support"
    ],
    technologies: ["React", "Vite", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    priceRange: "Custom quote based on pages, features, design, and integrations",
    isFeatured: true,
    isActive: true,
    order: 1,
    seoTitle: "Web Application Development Services",
    seoDescription:
      "Build responsive business websites, landing pages, dashboards, and custom web applications with CodeCraft.BD."
  },
  {
    title: "E-commerce Website Development",
    slug: "e-commerce-website-development",
    shortDescription:
      "Online store development with products, cart, checkout, payment workflows, orders, inventory, and admin controls.",
    description:
      "CodeCraft.BD develops e-commerce websites for retail, fashion, electronics, grocery, and product-based businesses. The service can include product catalog, categories, product details, cart, checkout, customer accounts, payment gateway planning, order management, inventory workflows, delivery workflow planning, admin dashboard, and reporting. For Bangladesh-focused businesses, local payment and delivery processes can be planned around preferred providers.",
    icon: "ShoppingCart",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop&q=80",
    features: [
      "Product catalog and category management",
      "Cart and checkout flow",
      "Order and inventory management",
      "Payment gateway integration planning",
      "Customer account and notification options",
      "Admin reporting and sales dashboard"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Payment Gateway", "Admin Dashboard", "Responsive UI"],
    priceRange: "Custom quote based on catalog size, payment, delivery, and admin features",
    isFeatured: true,
    isActive: true,
    order: 2,
    seoTitle: "E-commerce Website Development Services",
    seoDescription:
      "Create e-commerce websites with product catalog, cart, checkout, orders, inventory, payment workflow, and admin dashboard."
  },
  {
    title: "Custom Management Software",
    slug: "custom-management-software",
    shortDescription:
      "Business management systems for hospitals, coaching centers, property/rent, POS, education, and internal operations.",
    description:
      "CodeCraft.BD builds custom management software for organizations that need to replace spreadsheets, manual records, and disconnected tools with a structured digital system. This service is ideal for hospital management, coaching management, property and rent management, shop/product/POS management, school/college/university management, booking systems, staff workflows, reporting dashboards, approvals, and internal operations. The work starts by mapping the real business workflow, user roles, forms, reports, notifications, and data rules.",
    icon: "Layers",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    features: [
      "Workflow analysis and module planning",
      "Role-based admin dashboards",
      "Forms, records, reports, and data management",
      "Hospital, education, POS, rent, and business modules",
      "Search, filtering, status, and notification workflows",
      "Scalable structure for future modules"
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Role-Based Access", "Dashboard UI"],
    priceRange: "Custom quote based on modules, users, reports, and workflow complexity",
    isFeatured: true,
    isActive: true,
    order: 3,
    seoTitle: "Custom Management Software Development",
    seoDescription:
      "Build custom management systems for hospitals, coaching centers, rent/property, POS, schools, and business operations."
  },
  {
    title: "SaaS Product Development",
    slug: "saas-product-development",
    shortDescription:
      "SaaS platforms, portals, CRM-style systems, dashboards, subscriptions, roles, analytics, and scalable product architecture.",
    description:
      "CodeCraft.BD helps founders and businesses plan, design, and build SaaS products and cloud-based software platforms. This service covers product discovery, user roles, account or tenant structure, dashboards, subscription or package logic, reporting, onboarding, authentication, admin controls, integrations, and launch planning. The goal is to turn a software idea into a usable product that can grow over time.",
    icon: "Cloud",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    features: [
      "SaaS product planning and MVP scope",
      "User roles and account structure",
      "Dashboards and analytics",
      "Subscription or package-ready architecture",
      "Authentication and secure API workflow",
      "Scalable feature roadmap"
    ],
    technologies: ["React", "Node.js", "MongoDB", "REST API", "Authentication", "Cloud Deployment"],
    priceRange: "Custom quote based on MVP scope, roles, billing, and integrations",
    isFeatured: true,
    isActive: true,
    order: 4,
    seoTitle: "SaaS Product Development Services",
    seoDescription:
      "Plan and build SaaS platforms, dashboards, portals, subscriptions, CRM-style systems, and scalable software products."
  },
  {
    title: "UI/UX Design",
    slug: "ui-ux-design",
    shortDescription:
      "User-focused interface design, wireframes, Figma mockups, prototypes, responsive layouts, and design systems.",
    description:
      "CodeCraft.BD designs clean and practical user interfaces for websites, dashboards, SaaS products, mobile apps, and management systems. This service can include user journey planning, wireframes, Figma mockups, clickable prototypes, responsive layouts, component patterns, and design improvements for existing products. Good UI/UX helps clients validate the workflow before development and reduces costly revisions.",
    icon: "Palette",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&auto=format&fit=crop&q=80",
    features: [
      "User journey and screen planning",
      "Wireframes and Figma mockups",
      "Responsive web and dashboard layouts",
      "Clickable prototype options",
      "Design system and component patterns",
      "Existing UI review and redesign"
    ],
    technologies: ["Figma", "Wireframing", "Prototyping", "Design Systems", "Responsive Design", "UX Review"],
    priceRange: "Custom quote based on screens, user flows, and prototype needs",
    isFeatured: true,
    isActive: true,
    order: 5,
    seoTitle: "UI/UX Design Services",
    seoDescription:
      "Design user-friendly websites, dashboards, SaaS products, and mobile app interfaces with wireframes and Figma mockups."
  },
  {
    title: "API Development and Integration",
    slug: "api-development-and-integration",
    shortDescription:
      "Secure backend APIs, third-party integrations, payment gateway connections, webhooks, and data sync workflows.",
    description:
      "CodeCraft.BD builds REST APIs and backend integrations for websites, mobile apps, dashboards, SaaS products, and management systems. This service includes API architecture, validation, authentication, role permissions, error handling, documentation, payment gateway integration, third-party service integration, webhook handling, and data synchronization between systems.",
    icon: "Code",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    features: [
      "REST API development",
      "Authentication and permission workflow",
      "Payment gateway integration",
      "Third-party API integration",
      "Webhook and data sync workflow",
      "Validation, error handling, and documentation"
    ],
    technologies: ["Node.js", "Express", "MongoDB", "REST API", "JWT", "Payment Gateway"],
    priceRange: "Custom quote based on endpoints, integrations, and security needs",
    isFeatured: false,
    isActive: true,
    order: 6,
    seoTitle: "API Development and Integration Services",
    seoDescription:
      "Build secure APIs, payment gateway integrations, third-party connections, webhooks, and backend data workflows."
  },
  {
    title: "Mobile App Development",
    slug: "mobile-app-development",
    shortDescription:
      "Mobile app planning and development for Android/iOS with UI/UX, backend APIs, admin panels, and launch support.",
    description:
      "CodeCraft.BD can help plan and develop mobile app experiences for Android and iOS. Depending on the business goal, the solution may be a mobile app, responsive web app, or PWA. This service covers app planning, screen design, backend API planning, authentication, admin panel, notifications, and release preparation.",
    icon: "Smartphone",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&auto=format&fit=crop&q=80",
    features: [
      "Mobile app planning and scope",
      "Android and iOS-ready UI/UX",
      "Backend API and admin panel planning",
      "Authentication and notification workflows",
      "PWA or responsive web app alternatives",
      "Launch support guidance"
    ],
    technologies: ["React Native", "Flutter", "REST API", "Node.js", "Firebase", "Mobile UI"],
    priceRange: "Custom quote based on platform, screens, APIs, and app features",
    isFeatured: false,
    isActive: true,
    order: 7,
    seoTitle: "Mobile App Development Services",
    seoDescription:
      "Plan and build mobile app experiences with Android/iOS UI, backend APIs, admin panels, notifications, and launch support."
  },
  {
    title: "Cloud, Deployment and Maintenance",
    slug: "cloud-deployment-and-maintenance",
    shortDescription:
      "Deployment, hosting guidance, domain setup, maintenance, bug fixes, security updates, backups, and performance review.",
    description:
      "CodeCraft.BD supports project launch and post-launch maintenance for websites, dashboards, e-commerce stores, SaaS products, and custom software. This service includes deployment guidance, hosting setup support, domain/DNS guidance, environment configuration, performance checks, bug fixing, feature updates, backup planning, security updates, and ongoing improvement support.",
    icon: "Cloud",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    features: [
      "Deployment and hosting setup guidance",
      "Domain and DNS guidance",
      "Environment configuration",
      "Bug fixes and feature updates",
      "Backup and security update planning",
      "Performance and uptime review"
    ],
    technologies: ["Vercel", "Node.js", "MongoDB Atlas", "Cloudinary", "cPanel", "Deployment"],
    priceRange: "Custom quote based on hosting, support scope, and update frequency",
    isFeatured: false,
    isActive: true,
    order: 8,
    seoTitle: "Cloud Deployment and Maintenance Services",
    seoDescription:
      "Get deployment support, hosting guidance, domain setup, maintenance, bug fixes, backups, and performance improvements."
  }
];

const seedServices = async () => {
  await connectDB();

  const results = [];

  for (const service of services) {
    const savedService = await Service.findOneAndUpdate(
      { slug: service.slug },
      { $set: service },
      {
        returnDocument: "after",
        runValidators: true,
        setDefaultsOnInsert: true,
        upsert: true
      }
    );

    results.push(savedService);
  }

  console.log(`Seeded ${results.length} services`);
  results.forEach((service) => {
    console.log(`- ${service.order}. ${service.title} (${service.slug})`);
  });

  await mongoose.connection.close();
};

seedServices()
  .then(() => process.exit(0))
  .catch(async (error) => {
    console.error(`Service seed failed: ${error.message}`);
    await mongoose.connection.close().catch(() => {});
    process.exit(1);
  });
