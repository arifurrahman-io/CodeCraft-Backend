import Service from "../models/service.model.js";
import Project from "../models/project.model.js";
import Settings from "../models/settings.model.js";
import env from "../config/env.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import sendResponse from "../utils/apiResponse.js";

const MAX_MESSAGE_LENGTH = 800;
const MAX_HISTORY_ITEMS = 8;

const fallbackServices = [
  "Website Development",
  "E-commerce Solution",
  "SaaS Platform",
  "Mobile App Development",
  "Custom Software",
  "UI/UX Design",
  "Cloud Solutions"
];

const fallbackProjectExpertise = [
  "E-commerce platform",
  "Healthcare management system",
  "Real estate listing platform",
  "Restaurant management app",
  "Learning management system",
  "Fleet and logistics system"
];

const demoProjects = [
  {
    title: "Hospital Management Demo",
    url: "https://modernhospitalbd.vercel.app",
    description: "hospital and healthcare management workflows",
    keywords: [
      "hospital",
      "healthcare",
      "clinic",
      "doctor",
      "patient",
      "appointment",
      "medical",
      "hospital management",
      "healthcare management"
    ]
  },
  {
    title: "E-Commerce Demo",
    url: "https://ecommerce-gray-eta-80.vercel.app",
    description: "online store, cart, checkout, product and order workflows",
    keywords: [
      "ecommerce",
      "e-commerce",
      "online store",
      "store",
      "cart",
      "checkout",
      "payment",
      "product catalog",
      "order management"
    ]
  },
  {
    title: "Coaching Management Demo",
    url: "https://academyos-psi.vercel.app",
    description: "coaching center, course, student and academic management workflows",
    keywords: [
      "coaching",
      "coaching center",
      "course",
      "batch",
      "student",
      "teacher",
      "academy",
      "training",
      "coaching management"
    ]
  },
  {
    title: "Property/Rent Management Demo",
    url: "https://rentmasterbd.vercel.app",
    description: "property, rent, tenant and rental management workflows",
    keywords: [
      "property",
      "rent",
      "rental",
      "tenant",
      "landlord",
      "apartment",
      "flat",
      "real estate",
      "property management",
      "rent management"
    ]
  },
  {
    title: "Shop/Product/POS Management Demo",
    url: "https://smartdokan.vercel.app",
    description: "shop, product, inventory, sales and POS management workflows",
    keywords: [
      "shop",
      "pos",
      "point of sale",
      "product",
      "inventory",
      "sales",
      "billing",
      "stock",
      "dokan",
      "shop management",
      "pos management"
    ]
  },
  {
    title: "School/College/University Management Demo",
    url: "https://frii.edu.bd",
    description: "school, college, university and institute management workflows",
    keywords: [
      "school",
      "college",
      "university",
      "education",
      "institute",
      "campus",
      "student management",
      "school management",
      "college management",
      "university management"
    ]
  }
];

const industrySolutionAnswers = [
  {
    id: "healthcare",
    keywords: ["healthcare", "hospital", "clinic", "doctor", "patient", "appointment", "medical"],
    reply:
      "For healthcare, CodeCraft.BD can plan systems such as patient registration, appointment scheduling, doctor profiles, medical records, billing, reporting, and role-based dashboards. Healthcare projects need extra care around privacy, access control, auditability, and data accuracy."
  },
  {
    id: "realEstate",
    keywords: ["real estate", "property", "properties", "listing", "agent", "map", "apartment", "rent"],
    reply:
      "For real estate, CodeCraft.BD can build property listing platforms with search filters, map views, property detail pages, agent profiles, inquiry forms, image galleries, and admin controls for managing listings."
  },
  {
    id: "restaurant",
    keywords: ["restaurant", "food", "menu", "reservation", "kitchen", "table booking", "online order"],
    reply:
      "For restaurants, CodeCraft.BD can build online ordering, menu management, table reservation, kitchen order flow, customer notifications, inventory basics, and reporting dashboards."
  },
  {
    id: "education",
    keywords: ["education", "school", "course", "lms", "learning", "student", "quiz", "assignment"],
    reply:
      "For education, CodeCraft.BD can build LMS-style platforms with courses, lessons, quizzes, assignments, progress tracking, certificates, student dashboards, and admin controls."
  },
  {
    id: "logistics",
    keywords: ["logistics", "fleet", "vehicle", "driver", "gps", "tracking", "route", "delivery"],
    reply:
      "For logistics, CodeCraft.BD can build fleet and delivery systems with vehicle records, driver management, route or location features, maintenance tracking, status updates, and operational dashboards."
  }
];

const normalizeText = (value) => String(value || "").trim();

const faqAnswers = [
  {
    id: "pricing",
    keywords: [
      "price",
      "pricing",
      "cost",
      "budget",
      "charge",
      "quote",
      "quotation",
      "estimate",
      "how much",
      "package"
    ],
    reply:
      "There is no one fixed price because a 5-page company website, an e-commerce store, and a custom SaaS dashboard have very different scopes. The main cost factors are number of pages, UI/UX complexity, admin panel needs, payment or third-party integrations, content entry, security requirements, and deadline. For a practical estimate, share your project type, must-have features, reference websites, budget range, and expected launch date."
  },
  {
    id: "timeline",
    keywords: [
      "time",
      "timeline",
      "duration",
      "deadline",
      "delivery",
      "how long",
      "days",
      "weeks",
      "urgent"
    ],
    reply:
      "Timeline depends on the feature list and how ready your content is. A simple business website is usually much quicker than an e-commerce store, SaaS product, marketplace, or custom business system. CodeCraft.BD usually starts with requirement review, then breaks the work into design, development, testing, revision, and launch so the delivery plan is realistic."
  },
  {
    id: "website",
    keywords: [
      "website",
      "web site",
      "business site",
      "company site",
      "portfolio",
      "landing page",
      "corporate",
      "agency site"
    ],
    reply:
      "Yes. CodeCraft.BD can build responsive business websites, landing pages, company profiles, portfolio sites, service websites, and custom web experiences. A good business website should include clear service sections, strong calls to action, fast loading, mobile-friendly layouts, contact/lead forms, basic SEO setup, analytics, and easy content updates when needed."
  },
  {
    id: "ecommerce",
    keywords: [
      "ecommerce",
      "e-commerce",
      "online store",
      "shop",
      "cart",
      "payment",
      "checkout",
      "product",
      "inventory",
      "order",
      "bkash",
      "nagad",
      "sslcommerz"
    ],
    reply:
      "Yes. CodeCraft.BD can build e-commerce websites with product catalog, category/filter search, product details, cart, checkout, payment integration, order management, inventory controls, customer notifications, and admin reporting. For Bangladesh-focused stores, local payment and delivery workflows can be planned based on your preferred providers."
  },
  {
    id: "saas",
    keywords: [
      "saas",
      "dashboard",
      "subscription",
      "crm",
      "erp",
      "portal",
      "web app",
      "software",
      "multi tenant",
      "tenant",
      "analytics"
    ],
    reply:
      "Yes. CodeCraft.BD can help plan and build SaaS platforms, admin dashboards, portals, CRM-style systems, ERP modules, subscription products, and internal business tools. Important SaaS decisions include user roles, tenant/account structure, billing model, reporting, data security, onboarding flow, and future scaling."
  },
  {
    id: "customSoftware",
    keywords: [
      "custom software",
      "management system",
      "business automation",
      "automation",
      "internal tool",
      "operations",
      "workflow"
    ],
    reply:
      "Yes. CodeCraft.BD can build custom software for business operations such as booking systems, inventory, reporting dashboards, staff workflows, customer portals, approval systems, and process automation. The first step is mapping your current manual workflow, then deciding which parts should become roles, forms, dashboards, notifications, and reports."
  },
  {
    id: "mobile",
    keywords: ["mobile app", "android", "ios", "app development", "react native", "flutter", "play store", "app store"],
    reply:
      "CodeCraft.BD can discuss mobile app development for Android and iOS, including product planning, UI/UX, backend APIs, authentication, admin panels, notifications, and release support. For many businesses, a responsive web app or PWA may also be a faster first version before investing in full native mobile apps."
  },
  {
    id: "uiux",
    keywords: ["ui", "ux", "design", "figma", "prototype", "wireframe", "user interface", "mockup", "user experience"],
    reply:
      "Yes. CodeCraft.BD can help with UI/UX design, wireframes, Figma mockups, interactive prototypes, responsive layouts, and design system foundations. Good UI/UX work clarifies user journeys before development, which reduces confusion, revisions, and wasted build time."
  },
  {
    id: "api",
    keywords: ["api", "integration", "third party", "graphql", "rest", "webhook", "connect", "sync"],
    reply:
      "Yes. CodeCraft.BD can build REST APIs, integrate third-party services, connect payment gateways, sync data between systems, and create secure backend endpoints for web or mobile apps. API work should include validation, authentication, clear documentation, error handling, and logging."
  },
  {
    id: "adminPanel",
    keywords: [
      "admin panel",
      "admin dashboard",
      "dashboard",
      "cms",
      "content management",
      "manage content",
      "backend panel",
      "manage products",
      "manage orders"
    ],
    reply:
      "Yes. CodeCraft.BD can build admin panels and CMS-style dashboards so your team can manage services, products, blogs, projects, users, orders, messages, and settings without editing code. Admin panels should include secure login, role-based access, clean forms, filtering/search, and audit-friendly data handling."
  },
  {
    id: "process",
    keywords: ["process", "steps", "start", "how to start", "work flow", "workflow", "procedure", "next step"],
    reply:
      "The usual process is discovery, scope definition, estimate, UI/UX design if needed, development, testing, revision, deployment, and support. To start properly, share your business goal, target users, required features, reference websites or apps, content readiness, budget range, and preferred timeline."
  },
  {
    id: "support",
    keywords: ["support", "maintenance", "update", "bug", "after launch", "hosting", "domain", "server", "deployment"],
    reply:
      "CodeCraft.BD can provide post-launch support, bug fixes, updates, deployment help, hosting guidance, domain setup guidance, monitoring suggestions, and feature improvements. A healthy maintenance plan should cover security updates, backups, uptime checks, performance review, and small content or UI changes."
  },
  {
    id: "seo",
    keywords: ["seo", "google ranking", "rank", "search engine", "meta", "sitemap", "analytics"],
    reply:
      "CodeCraft.BD can set up SEO-friendly structure for websites, including clean page titles, meta descriptions, semantic layout, sitemap/robots files, fast loading, mobile responsiveness, and share metadata. For competitive ranking, ongoing content, backlinks, local SEO, and analytics review are also important."
  },
  {
    id: "security",
    keywords: ["security", "secure", "hack", "authentication", "login", "permission", "role", "data protection"],
    reply:
      "Security is handled based on project risk. For typical web apps, CodeCraft.BD can implement secure authentication, role-based access, input validation, protected APIs, safe file uploads, environment-based secrets, database access controls, and deployment best practices. Sensitive systems may need additional review and hardening."
  },
  {
    id: "performance",
    keywords: ["performance", "speed", "fast", "slow", "optimization", "load time", "core web vitals"],
    reply:
      "Performance matters for both users and SEO. CodeCraft.BD can improve speed through optimized frontend code, image handling, caching strategy, API efficiency, database query improvements, lazy loading, and deployment choices. The right approach depends on whether the bottleneck is design assets, frontend rendering, backend logic, or hosting."
  },
  {
    id: "technology",
    keywords: [
      "technology",
      "tech stack",
      "react",
      "node",
      "mongodb",
      "postgresql",
      "next",
      "laravel",
      "wordpress",
      "stack",
      "mern"
    ],
    reply:
      "The technology stack should match the business goal, not just a trend. For modern custom web apps, CodeCraft.BD can work with frontend frameworks, backend APIs, databases, authentication, cloud/deployment tools, and integrations. React, Node.js, MongoDB/PostgreSQL-style stacks are strong for custom dashboards, SaaS products, APIs, and scalable business systems."
  },
  {
    id: "wordpress",
    keywords: ["wordpress", "wp", "theme", "plugin", "elementor"],
    reply:
      "WordPress can be a good fit for content-heavy websites, blogs, and simpler business sites when fast content management is the main priority. For highly custom workflows, SaaS, dashboards, and complex integrations, a custom web app stack is usually more flexible and maintainable."
  },
  {
    id: "redesign",
    keywords: ["redesign", "old website", "revamp", "rebuild", "modernize", "migration", "migrate"],
    reply:
      "Yes. CodeCraft.BD can help redesign or rebuild an existing website. A good redesign checks current content, SEO URLs, performance issues, conversion problems, mobile experience, analytics, and admin workflow so the new site improves business results instead of only changing visuals."
  },
  {
    id: "chatbot",
    keywords: ["chatbot", "chat bot", "ai agent", "ai assistant", "automation assistant", "faq bot"],
    reply:
      "Yes. CodeCraft.BD can add a basic FAQ chatbot for unlimited local answers, or integrate an AI-powered assistant when API budget and quota are available. A practical chatbot can answer service questions, collect project details, guide users to WhatsApp/contact forms, and reduce repeated client queries."
  },
  {
    id: "ownership",
    keywords: ["source code", "ownership", "own the code", "handover", "documentation", "training"],
    reply:
      "Project handover can include source code, deployment notes, admin access, usage guidance, and basic documentation depending on the agreement. It is best to confirm ownership, hosting access, maintenance terms, and future update process before development starts."
  },
  {
    id: "contact",
    keywords: ["contact", "whatsapp", "phone", "email", "call", "meeting", "discuss"],
    reply:
      "You can contact CodeCraft.BD through the website contact form or WhatsApp button. For the best response, include your project type, business goal, required features, reference links, budget range, and preferred deadline."
  },
  {
    id: "services",
    keywords: ["service", "services", "what do you do", "offer", "provide", "can you do", "expertise", "specialize"],
    reply:
      "CodeCraft.BD provides web development, e-commerce development, SaaS and custom software, API development and integrations, UI/UX design, mobile app planning/development, admin dashboards, and digital product consulting. The strongest fit is a business that needs a reliable digital product, not just a static online brochure."
  }
];

const getWords = (value) =>
  normalizeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

const includesPhrase = (message, phrase) => message.includes(phrase.toLowerCase());

const getBestFaqAnswer = (message) => {
  const lowerMessage = message.toLowerCase();

  return faqAnswers
    .map((answer) => {
      const keywordScore = answer.keywords.reduce(
        (total, keyword) =>
          total + (includesPhrase(lowerMessage, keyword) ? Math.max(1, keyword.length / 8) : 0),
        0
      );
      const boost =
        (answer.id === "adminPanel" && /\b(admin|dashboard|cms)\b/.test(lowerMessage) ? 3 : 0) +
        (answer.id === "api" && /(\bapi\b|\bintegration\b|\bintegrate\b)/.test(lowerMessage) ? 3 : 0) +
        (answer.id === "seo" && /\bseo\b/.test(lowerMessage) ? 3 : 0) +
        (answer.id === "security" && /(\bsecure\b|\bsecurity\b)/.test(lowerMessage) ? 2 : 0);

      return {
        answer,
        score: keywordScore + boost
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)[0]?.answer;
};

const getIndustrySolutionAnswer = (message) => {
  const lowerMessage = message.toLowerCase();

  return industrySolutionAnswers.find((answer) =>
    answer.keywords.some((keyword) => includesPhrase(lowerMessage, keyword))
  );
};

const getBestDemoProject = (message) => {
  const lowerMessage = message.toLowerCase();

  return demoProjects
    .map((demo) => {
      const score = demo.keywords.reduce(
        (total, keyword) =>
          total + (includesPhrase(lowerMessage, keyword) ? Math.max(1, keyword.length / 7) : 0),
        0
      );

      return { demo, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)[0]?.demo;
};

const hasDemoIntent = (message) =>
  [
    "demo",
    "demo link",
    "live demo",
    "preview",
    "sample",
    "example site",
    "show link",
    "project link",
    "site link"
  ].some((keyword) => includesPhrase(message.toLowerCase(), keyword));

const buildDemoLinkSuggestion = (message) => {
  const demo = getBestDemoProject(message);

  if (!demo) return "";

  return ` Related demo: ${demo.title} (${demo.description}) - ${demo.url}.`;
};

const buildAllDemoLinksReply = () =>
  `Here are CodeCraft.BD demo project links: ${demoProjects
    .map((demo) => `${demo.title}: ${demo.url}`)
    .join(" | ")}.`;

const getBestServiceMatch = (message, services = []) => {
  const words = new Set(getWords(message));

  return services
    .map((service) => {
      const serviceWords = getWords(
        [service.title, service.shortDescription, ...(service.technologies || [])].join(" ")
      );
      const score = serviceWords.reduce((total, word) => total + (words.has(word) ? 1 : 0), 0);
      return { service, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)[0]?.service;
};

const buildAvailableServicesText = (services = []) => {
  const titles = services.length
    ? services.map((service) => service.title).slice(0, 6)
    : fallbackServices;

  return titles.join(", ");
};

const buildProjectExpertiseText = (projects = []) => {
  if (!projects.length) return fallbackProjectExpertise.join(", ");

  const highlights = projects
    .map((project) => project.category || project.title)
    .filter(Boolean)
    .slice(0, 6);

  return [...new Set(highlights)].join(", ");
};

const getBestProjectMatch = (message, projects = []) => {
  const words = new Set(getWords(message));

  return projects
    .map((project) => {
      const projectWords = getWords(
        [
          project.title,
          project.category,
          project.shortDescription,
          project.description,
          ...(project.features || []),
          ...(project.technologies || [])
        ].join(" ")
      );
      const score = projectWords.reduce((total, word) => total + (words.has(word) ? 1 : 0), 0);
      return { project, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)[0]?.project;
};

const hasPortfolioIntent = (message) =>
  [
    "portfolio",
    "project",
    "projects",
    "case study",
    "case studies",
    "experience",
    "industry",
    "industries",
    "worked on",
    "example"
  ].some((keyword) => includesPhrase(message.toLowerCase(), keyword));

const buildContactSuggestion = (settings, includeDetails = false) => {
  const { contact } = buildCompanyContext(settings);
  if (includeDetails) {
    return `Contact details: ${contact}`;
  }

  return "For an exact quote or timeline, please use the contact form or WhatsApp.";
};

const buildServiceContext = (services = []) => {
  if (!services.length) {
    return fallbackServices.map((service) => `- ${service}`).join("\n");
  }

  return services
    .map((service) => {
      const details = [
        service.shortDescription,
        service.priceRange ? `Price range: ${service.priceRange}` : "",
        service.technologies?.length
          ? `Technologies: ${service.technologies.slice(0, 6).join(", ")}`
          : ""
      ]
        .filter(Boolean)
        .join(" | ");

      return `- ${service.title}${details ? `: ${details}` : ""}`;
    })
    .join("\n");
};

const buildProjectContext = (projects = []) => {
  if (!projects.length) {
    return fallbackProjectExpertise.map((project) => `- ${project}`).join("\n");
  }

  return projects
    .map((project) => {
      const details = [project.category, project.shortDescription].filter(Boolean).join(" | ");
      return `- ${project.title}${details ? `: ${details}` : ""}`;
    })
    .join("\n");
};

const buildDemoProjectContext = () =>
  demoProjects
    .map((demo) => `- ${demo.title}: ${demo.description}. Link: ${demo.url}`)
    .join("\n");

const buildCompanyContext = (settings) => {
  const companyName = settings?.companyName || "CodeCraft.BD";
  const contactBits = [
    settings?.email ? `Email: ${settings.email}` : "",
    settings?.phone ? `Phone/WhatsApp: ${settings.phone}` : "",
    settings?.address ? `Address: ${settings.address}` : "",
    settings?.website ? `Website: ${settings.website}` : ""
  ].filter(Boolean);

  return {
    companyName,
    contact: contactBits.length ? contactBits.join(" | ") : "Use the website contact form or WhatsApp button."
  };
};

const buildConversationInput = (message, history = []) => {
  const cleanHistory = Array.isArray(history)
    ? history
        .slice(-MAX_HISTORY_ITEMS)
        .map((item) => ({
          role: item?.role === "assistant" ? "assistant" : "user",
          content: normalizeText(item?.content).slice(0, MAX_MESSAGE_LENGTH)
        }))
        .filter((item) => item.content)
    : [];

  const transcript = cleanHistory
    .map((item) => `${item.role === "assistant" ? "Assistant" : "Client"}: ${item.content}`)
    .join("\n");

  return [transcript ? `Recent conversation:\n${transcript}` : "", `Client: ${message}`]
    .filter(Boolean)
    .join("\n\n");
};

const extractOutputText = (payload) => {
  if (typeof payload?.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text.trim();
  }

  const output = Array.isArray(payload?.output) ? payload.output : [];
  const text = output
    .flatMap((item) => (Array.isArray(item?.content) ? item.content : []))
    .map((content) => content?.text || "")
    .filter(Boolean)
    .join("\n")
    .trim();

  return text;
};

const createFaqAssistantReply = ({ message, settings, services, projects }) => {
  const demoLinkSuggestion = buildDemoLinkSuggestion(message);

  if (hasDemoIntent(message) && !demoLinkSuggestion) {
    return `${buildAllDemoLinksReply()} ${buildContactSuggestion(settings)}`;
  }

  if (hasDemoIntent(message) && demoLinkSuggestion) {
    return `${demoLinkSuggestion.trim()} ${buildContactSuggestion(settings)}`;
  }

  if (/^(hi|hello|hey|assalamu|salam|good morning|good afternoon|good evening)\b/i.test(message)) {
    return `Hello. CodeCraft.BD can help with ${buildAvailableServicesText(
      services
    )}. The team also has experience across ${buildProjectExpertiseText(
      projects
    )}. What would you like to build?`;
  }

  const matchedProject = getBestProjectMatch(message, projects);

  if (hasPortfolioIntent(message) && matchedProject) {
    return `Yes. CodeCraft.BD has relevant experience in ${matchedProject.category || "similar software work"}. One example is ${matchedProject.title}, which involved ${matchedProject.shortDescription}. For a similar project, the team would first confirm your users, core workflow, must-have features, integrations, and launch timeline. ${buildContactSuggestion(
      settings
    )}${demoLinkSuggestion}`;
  }

  const industryAnswer = getIndustrySolutionAnswer(message);

  if (industryAnswer) {
    return `${industryAnswer.reply} If you already have a similar project in mind, share the user roles, daily workflow, must-have reports, integrations, and data privacy needs. ${buildContactSuggestion(
      settings
    )}${demoLinkSuggestion}`;
  }

  if (hasPortfolioIntent(message)) {
    return `CodeCraft.BD has experience across ${buildProjectExpertiseText(
      projects
    )}. These types of projects usually involve discovery, UI/UX planning, frontend and backend development, admin dashboards, integrations, testing, and launch support. ${buildContactSuggestion(
      settings
    )}`;
  }

  const faqAnswer = getBestFaqAnswer(message);

  if (faqAnswer) {
    return `${faqAnswer.reply} ${buildContactSuggestion(
      settings,
      faqAnswer.id === "contact"
    )}${demoLinkSuggestion}`;
  }

  const matchedService = getBestServiceMatch(message, services);

  if (matchedService) {
    const details = [
      matchedService.shortDescription,
      matchedService.priceRange ? `Indicative range: ${matchedService.priceRange}` : "",
      matchedService.technologies?.length
        ? `Common technologies: ${matchedService.technologies.slice(0, 5).join(", ")}.`
        : ""
    ]
      .filter(Boolean)
      .join(" ");

    return `${matchedService.title}: ${details || "CodeCraft.BD can help with this service."} ${buildContactSuggestion(
      settings
    )}${demoLinkSuggestion}`;
  }

  return `I can help with basic questions about ${buildAvailableServicesText(
    services
  )}. Please tell me what type of website, app, or software you want to build. ${buildContactSuggestion(
    settings
  )}${demoLinkSuggestion}`;
};

const createOpenAiReply = async ({ message, history, settings, services, projects }) => {
  const { companyName, contact } = buildCompanyContext(settings);
  const serviceContext = buildServiceContext(services);
  const projectContext = buildProjectContext(projects);
  const demoProjectContext = buildDemoProjectContext();

  const instructions = `
You are the AI service assistant for ${companyName}, a Bangladesh-based software team.
Your job is to answer basic client questions about web development and related services.

Company contact:
${contact}

Available services:
${serviceContext}

Relevant project experience:
${projectContext}

Demo project links:
${demoProjectContext}

Behavior rules:
- Keep replies concise, warm, and practical.
- Ask one useful follow-up question when the client is vague.
- Explain general process, service fit, and next steps.
- Encourage the client to use the contact form or WhatsApp for quotes, timelines, and private project details.
- If the client asks about a service area with a matching demo project, include the relevant demo link.
- Do not invent exact prices, delivery dates, discounts, legal terms, or guarantees.
- If the question is unrelated to software/web/app/design services, politely redirect to CodeCraft.BD services.
`.trim();

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.openai.apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: env.openai.model,
      instructions,
      input: buildConversationInput(message, history),
      max_output_tokens: 220,
      store: false
    })
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    const openAiMessage = payload?.error?.message || "Unknown OpenAI API error";
    const openAiCode = payload?.error?.code || "";
    console.error(`OpenAI API error (${response.status}${openAiCode ? `/${openAiCode}` : ""}): ${openAiMessage}`);

    if (response.status === 401 || response.status === 403) {
      throw new ApiError(503, "AI assistant is not available right now.");
    }

    if (response.status === 429 || openAiCode === "insufficient_quota") {
      throw new ApiError(503, "AI assistant is temporarily unavailable right now.");
    }

    if (response.status >= 500) {
      throw new ApiError(502, "AI assistant could not respond right now.");
    }

    throw new ApiError(400, "AI assistant could not process that request.");
  }

  const reply = extractOutputText(payload);

  if (!reply) {
    throw new ApiError(502, "The AI service returned an empty response.");
  }

  return reply;
};

export const askAiAssistant = asyncHandler(async (req, res) => {
  const message = normalizeText(req.body.message);

  if (!message) {
    throw new ApiError(400, "Message is required");
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    throw new ApiError(400, `Message must be ${MAX_MESSAGE_LENGTH} characters or less`);
  }

  const [settings, services, projects] = await Promise.all([
    Settings.findOne().lean(),
    Service.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .select("title shortDescription priceRange technologies")
      .limit(10)
      .lean(),
    Project.find({ isActive: true })
      .sort({ isFeatured: -1, createdAt: -1 })
      .select("title category shortDescription description features technologies")
      .limit(8)
      .lean()
  ]);

  let reply;
  let source = "faq";

  if (env.assistant.provider === "openai" && env.openai.apiKey) {
    try {
      reply = await createOpenAiReply({
        message,
        history: req.body.history,
        settings,
        services,
        projects
      });
      source = "openai";
    } catch (error) {
      console.error(`Falling back to FAQ assistant: ${error.message}`);
      reply = createFaqAssistantReply({ message, settings, services, projects });
    }
  } else {
    reply = createFaqAssistantReply({ message, settings, services, projects });
  }

  return sendResponse(res, 200, "Assistant response generated successfully", { reply, source });
});
