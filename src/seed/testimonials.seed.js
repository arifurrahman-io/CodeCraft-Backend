import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Testimonial from "../models/testimonial.model.js";

const testimonials = [
  {
    clientName: "Dr. Mahmud Hasan",
    company: "Modern Hospital BD",
    designation: "Managing Director",
    photo:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&auto=format&fit=crop&q=80",
    review:
      "CodeCraft.BD understood our hospital workflow clearly and presented a clean management system for patients, doctors, appointments, billing, and reports. The dashboard structure made complex healthcare operations much easier to follow.",
    rating: 5,
    isActive: true,
    order: 1
  },
  {
    clientName: "Nusrat Jahan",
    company: "StyleMart Online",
    designation: "Founder",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
    review:
      "The e-commerce demo showed exactly what we needed: product catalog, shopping flow, cart, checkout, and order management. The team explained payment, inventory, and admin requirements in a very practical way.",
    rating: 5,
    isActive: true,
    order: 2
  },
  {
    clientName: "Md. Rafiq Islam",
    company: "AcademyOS Coaching",
    designation: "Director",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43?w=300&auto=format&fit=crop&q=80",
    review:
      "For coaching center management, CodeCraft.BD captured the important pieces: students, courses, batches, teachers, admissions, and academic operations. Their planning approach helped us understand the full software scope before development.",
    rating: 5,
    isActive: true,
    order: 3
  },
  {
    clientName: "Tanvir Ahmed",
    company: "RentMaster BD",
    designation: "Property Manager",
    photo:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80",
    review:
      "The property and rent management solution is useful for tracking properties, tenants, rent, agreements, and maintenance workflows. CodeCraft.BD made the system feel organized and easy for property teams to use.",
    rating: 5,
    isActive: true,
    order: 4
  },
  {
    clientName: "Sadia Rahman",
    company: "Smart Dokan",
    designation: "Retail Business Owner",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&auto=format&fit=crop&q=80",
    review:
      "The shop and POS management demo matched our retail needs very well. Product management, stock workflow, billing, sales tracking, and dashboard reporting were arranged in a way that small businesses can understand quickly.",
    rating: 5,
    isActive: true,
    order: 5
  },
  {
    clientName: "Professor Arif Chowdhury",
    company: "FRII Education",
    designation: "Academic Coordinator",
    photo:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=300&auto=format&fit=crop&q=80",
    review:
      "The education management system covered the core needs of schools, colleges, and universities. Student records, teacher workflows, class structure, notices, fees, and admin reporting were presented professionally.",
    rating: 5,
    isActive: true,
    order: 6
  },
  {
    clientName: "Ayesha Sultana",
    company: "GrowthLab BD",
    designation: "Operations Lead",
    photo:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80",
    review:
      "CodeCraft.BD is strong at turning business workflows into usable web applications. Their communication around UI/UX, admin panels, APIs, deployment, and maintenance made the project planning process smooth.",
    rating: 5,
    isActive: true,
    order: 7
  }
];

const seedTestimonials = async () => {
  await connectDB();

  const results = [];

  for (const testimonial of testimonials) {
    const savedTestimonial = await Testimonial.findOneAndUpdate(
      {
        clientName: testimonial.clientName,
        company: testimonial.company
      },
      { $set: testimonial },
      {
        returnDocument: "after",
        runValidators: true,
        setDefaultsOnInsert: true,
        upsert: true
      }
    );

    results.push(savedTestimonial);
  }

  console.log(`Seeded ${results.length} testimonials`);
  results.forEach((testimonial) => {
    console.log(`- ${testimonial.order}. ${testimonial.clientName} (${testimonial.company})`);
  });

  await mongoose.connection.close();
};

seedTestimonials()
  .then(() => process.exit(0))
  .catch(async (error) => {
    console.error(`Testimonial seed failed: ${error.message}`);
    await mongoose.connection.close().catch(() => {});
    process.exit(1);
  });
