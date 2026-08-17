import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Blog from "../models/blog.model.js";

const blogs = [
  {
    title: "How a Custom Business Website Turns Visitors Into Qualified Leads",
    slug: "custom-business-website-qualified-leads",
    excerpt:
      "A practical guide to planning a business website that does more than look good: it explains your offer, builds trust, and turns visitors into leads.",
    content: `
## A Website Should Work Like a Sales Assistant

A modern business website is not only an online brochure. For a service company, agency, clinic, institute, shop, or local business, the website should quickly answer three questions:

- What do you provide?
- Why should someone trust you?
- How can a potential client contact you?

When these answers are clear, visitors are more likely to send a message, call, book a meeting, or request a quote.

## Key Sections Every Business Website Needs

The strongest business websites usually include a clear hero section, service overview, project or portfolio proof, testimonials, contact options, and frequently asked questions. If the company sells technical services, a blog or resource section also helps educate visitors before they speak with the team.

## Lead Generation Features

Small details often improve conversion. A contact form should ask for useful project details without feeling too long. WhatsApp or phone buttons should be easy to find. Service pages should explain scope, process, and next steps. Case studies or demo links help clients understand what kind of work is possible.

## Technical Quality Matters

A good website should be responsive, fast, SEO-friendly, secure, and easy to maintain. This includes optimized images, clean page titles, structured content, sitemap setup, mobile-friendly layout, and proper deployment.

## How CodeCraft.BD Approaches It

CodeCraft.BD plans websites around business goals first. The process starts with understanding the target users, services, content, calls to action, and future update needs. Then the design and development are shaped around the real workflow instead of only visual decoration.
`.trim(),
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    category: "Web Development",
    tags: ["Web Development", "Business Website", "Lead Generation", "SEO", "UI/UX"],
    views: 86,
    isPublished: true,
    publishedAt: new Date("2026-05-10"),
    seoTitle: "How a Custom Business Website Turns Visitors Into Leads",
    seoDescription:
      "Learn how a custom business website can explain services, build trust, improve SEO, and generate qualified leads for your business."
  },
  {
    title: "E-commerce Website Launch Checklist for Product-Based Businesses",
    slug: "ecommerce-website-launch-checklist",
    excerpt:
      "Before launching an online store, plan the product catalog, cart, checkout, payment flow, inventory, order management, and admin reporting.",
    content: `
## E-commerce Needs More Than Product Cards

An e-commerce website must create a smooth buying journey from product discovery to checkout. A beautiful storefront is useful, but the business also needs reliable order handling, inventory awareness, payment planning, and admin control.

## Product and Catalog Planning

Start by organizing products into categories, attributes, pricing rules, stock status, images, descriptions, and search/filter needs. If these are unclear, customers may struggle to find the right product and admins may struggle to manage the store.

## Checkout and Payment Flow

Checkout should be short, clear, and trustworthy. For Bangladesh-focused stores, payment gateway planning may include local payment methods, cash on delivery rules, delivery charge logic, and order confirmation messages.

## Admin Dashboard Requirements

The admin side should support product management, order management, inventory updates, customer records, status changes, sales overview, and basic reports. These tools save time after launch.

## Common Launch Mistakes

Many stores launch without testing mobile checkout, email or SMS notifications, product image size, delivery charge rules, and failed payment handling. Testing these before launch reduces lost sales and support pressure.

## How CodeCraft.BD Can Help

CodeCraft.BD can build e-commerce platforms with product catalog, cart, checkout, payment workflow, order management, inventory controls, and admin dashboard features. The exact scope depends on the number of products, payment needs, delivery rules, and reporting requirements.
`.trim(),
    coverImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop&q=80",
    category: "E-commerce",
    tags: ["E-commerce", "Online Store", "Payment Gateway", "Inventory", "Admin Dashboard"],
    views: 112,
    isPublished: true,
    publishedAt: new Date("2026-05-11"),
    seoTitle: "E-commerce Website Launch Checklist",
    seoDescription:
      "Plan product catalog, cart, checkout, payment, inventory, order management, and admin reports before launching an e-commerce website."
  },
  {
    title: "When Your Business Needs Custom Management Software Instead of Spreadsheets",
    slug: "custom-management-software-instead-of-spreadsheets",
    excerpt:
      "Hospitals, schools, coaching centers, shops, and property businesses often outgrow spreadsheets. Here is when custom software becomes the better choice.",
    content: `
## Spreadsheets Are Useful Until the Workflow Becomes Complex

Many businesses start with spreadsheets because they are flexible and familiar. But when multiple people need access, records become sensitive, reports are required, or the workflow has many steps, spreadsheets can become risky and slow.

## Signs You Need a Management System

You may need custom management software when your team is copying the same data repeatedly, losing track of payment status, struggling with reports, handling too many manual approvals, or managing different user roles without proper permission control.

## Common Use Cases

Hospitals need patient, doctor, appointment, billing, and medical workflow modules. Schools and colleges need student, teacher, class, notice, fee, and academic reporting modules. Shops need product, stock, sales, billing, and POS workflows. Property businesses need property, tenant, rent, agreement, and maintenance tracking.

## Why Custom Software Helps

Custom software turns the real workflow into structured forms, dashboards, reports, notifications, and role-based access. It reduces manual mistakes and makes important data easier to search, update, and analyze.

## How to Start Planning

Start by listing user roles, daily tasks, records, reports, approval steps, and pain points. Then decide what must be included in version one and what can wait for later.

## CodeCraft.BD Demo Areas

CodeCraft.BD has demo references for hospital management, coaching management, property/rent management, shop/POS management, and school/college/university management systems. These demos help clients understand possible workflows before starting a custom project.
`.trim(),
    coverImage:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&auto=format&fit=crop&q=80",
    category: "Custom Software",
    tags: ["Custom Software", "Management System", "Dashboard", "Automation", "Business Workflow"],
    views: 94,
    isPublished: true,
    publishedAt: new Date("2026-05-12"),
    seoTitle: "When Businesses Need Custom Management Software",
    seoDescription:
      "Learn when hospitals, schools, shops, coaching centers, and property businesses should move from spreadsheets to custom management software."
  },
  {
    title: "SaaS MVP Planning: What to Build First and What to Delay",
    slug: "saas-mvp-planning-build-first",
    excerpt:
      "A SaaS MVP should focus on the core workflow, user roles, onboarding, dashboard value, and feedback loop before adding advanced features.",
    content: `
## A SaaS MVP Should Prove the Core Workflow

The first version of a SaaS product does not need every feature. It needs to prove that users can solve the main problem clearly and repeatedly. A focused MVP is easier to launch, test, improve, and sell.

## Start With User Roles

Most SaaS products need different roles such as owner, admin, staff, customer, or member. Define what each role can see, create, edit, delete, approve, or report. This decision affects the entire architecture.

## Build the Main Workflow First

If the product is a CRM, build lead capture, pipeline movement, notes, and reporting first. If it is a booking system, build availability, booking, confirmation, and admin control first. If it is a dashboard product, build the key data view and the actions users take from it.

## Delay Advanced Features

Advanced analytics, automation, multiple integrations, complex billing, and deep customization can come later unless they are required for the first paying users. Keeping version one focused reduces cost and risk.

## Technical Considerations

Plan authentication, database structure, API design, validation, role permissions, backup strategy, deployment, and monitoring early. These foundations make future scaling easier.

## How CodeCraft.BD Helps

CodeCraft.BD helps clients define SaaS MVP scope, user roles, dashboards, backend APIs, admin controls, integrations, and a practical roadmap for later versions.
`.trim(),
    coverImage:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80",
    category: "SaaS Development",
    tags: ["SaaS", "MVP", "Startup", "Dashboard", "Product Development"],
    views: 78,
    isPublished: true,
    publishedAt: new Date("2026-05-13"),
    seoTitle: "SaaS MVP Planning Guide",
    seoDescription:
      "Learn how to plan a SaaS MVP by focusing on core workflow, user roles, onboarding, dashboard value, and future roadmap."
  },
  {
    title: "UI/UX Checklist for Admin Panels and Business Dashboards",
    slug: "ui-ux-checklist-admin-panels-business-dashboards",
    excerpt:
      "Admin panels should be fast, clear, and easy to scan. Use this checklist to plan better dashboards for real business users.",
    content: `
## Admin Panels Are Work Tools

A dashboard is not a landing page. It should help users complete repeated tasks quickly, scan important information, find records, and avoid mistakes. The best admin panels are quiet, organized, and predictable.

## Navigation and Structure

Group related modules logically. For example, e-commerce dashboards may group products, orders, customers, payments, and reports. Education dashboards may group students, teachers, classes, fees, notices, and results.

## Tables, Filters, and Search

Most business dashboards depend on lists of records. Tables should include meaningful columns, search, filters, status badges, pagination, and clear actions. Users should not have to open every record to understand what is happening.

## Forms and Validation

Forms should be clear, compact, and forgiving. Labels, placeholders, required fields, validation messages, file upload rules, and save states reduce confusion and support requests.

## Role-Based Interfaces

Different users often need different access. A staff user may not need the same screens as an owner or admin. UI/UX should support permissions without making the system feel complicated.

## CodeCraft.BD Design Approach

CodeCraft.BD designs dashboards around real workflow. The process starts with user roles, daily tasks, data structure, and reporting needs, then turns those into practical screens and reusable components.
`.trim(),
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80",
    category: "UI/UX Design",
    tags: ["UI/UX", "Admin Panel", "Dashboard", "Design System", "Business Software"],
    views: 71,
    isPublished: true,
    publishedAt: new Date("2026-05-14"),
    seoTitle: "UI/UX Checklist for Admin Panels",
    seoDescription:
      "A practical UI/UX checklist for designing admin panels and business dashboards that are clear, fast, searchable, and role-aware."
  },
  {
    title: "After Website Launch: Maintenance, Security, Speed, and Updates",
    slug: "website-maintenance-security-speed-updates",
    excerpt:
      "A website or web app needs ongoing care after launch. Maintenance keeps it secure, fast, stable, and ready for business changes.",
    content: `
## Launch Is Not the End

After a website or software product goes live, real users start interacting with it. That is when performance, security, uptime, content updates, bug fixes, and feature improvements become important.

## Security and Backups

Web apps should keep secrets out of frontend code, validate input, protect admin routes, manage file uploads safely, and use proper environment configuration. Backups and recovery planning are also important for business-critical systems.

## Performance Review

Slow pages can reduce leads, sales, and user trust. Performance work may include image optimization, frontend code improvements, API optimization, database query review, caching, and better deployment choices.

## Content and Feature Updates

Businesses change. Services, pricing, team details, project portfolios, blogs, and contact information may need regular updates. Admin panels and CMS workflows make these changes easier.

## Monitoring and Support

Basic monitoring, error review, and support workflow help catch issues early. For e-commerce or management systems, even small bugs can affect orders, records, or staff operations.

## How CodeCraft.BD Supports Clients

CodeCraft.BD can help with deployment, hosting guidance, domain setup, bug fixes, feature updates, security improvements, backups, performance checks, and ongoing maintenance planning.
`.trim(),
    coverImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&auto=format&fit=crop&q=80",
    category: "Maintenance",
    tags: ["Maintenance", "Security", "Performance", "Deployment", "Hosting"],
    views: 69,
    isPublished: true,
    publishedAt: new Date("2026-05-15"),
    seoTitle: "Website Maintenance, Security, and Speed After Launch",
    seoDescription:
      "Learn why websites and web apps need maintenance, security updates, backups, speed optimization, and ongoing support after launch."
  }
];

const seedBlogs = async () => {
  await connectDB();

  const results = [];

  for (const blog of blogs) {
    const savedBlog = await Blog.findOneAndUpdate(
      { slug: blog.slug },
      { $set: blog },
      {
        returnDocument: "after",
        runValidators: true,
        setDefaultsOnInsert: true,
        upsert: true
      }
    );

    results.push(savedBlog);
  }

  console.log(`Seeded ${results.length} blogs`);
  results.forEach((blog) => {
    console.log(`- ${blog.title} (${blog.slug})`);
  });

  await mongoose.connection.close();
};

seedBlogs()
  .then(() => process.exit(0))
  .catch(async (error) => {
    console.error(`Blog seed failed: ${error.message}`);
    await mongoose.connection.close().catch(() => {});
    process.exit(1);
  });
