export const heroStats = [
  { id: "agents", label: "Agents", value: "247" },
  { id: "categories", label: "Categories", value: "12" },
  { id: "workspaces", label: "Workspaces", value: "1,500+" },
];

export const collections = [
  {
    id: "support",
    title: "Customer Support Essentials",
    description:
      "Automate ticket routing, response generation, and escalation workflows",
    tags: ["Support Triage", "Email Classifier", "+3 more"],
    accent: "from-blue-600 via-indigo-500 to-purple-500",
  },
  {
    id: "finance",
    title: "Finance Automation",
    description:
      "Generate reports, reconcile transactions, and calculate metrics automatically",
    tags: ["Report Builder", "Data Reconciler", "+2 more"],
    accent: "from-emerald-500 via-emerald-600 to-emerald-700",
  },
  {
    id: "marketing",
    title: "Marketing Operations",
    description: "Content generation, lead enrichment, and campaign optimization",
    tags: ["Content Creator", "Lead Enricher", "+4 more"],
    accent: "from-amber-500 via-amber-600 to-orange-600",
  },
];

export const filters = {
  useCases: [
    { id: "support", label: "Customer Support", count: 42 },
    { id: "finance", label: "Finance & Accounting", count: 28 },
    { id: "marketing", label: "Marketing", count: 35 },
    { id: "ops", label: "Operations", count: 31 },
    { id: "data", label: "Data Transformation", count: 52 },
  ],
  complexity: [
    { id: "beginner", label: "Beginner-friendly", count: 89 },
    { id: "intermediate", label: "Intermediate", count: 102 },
    { id: "advanced", label: "Advanced", count: 56 },
  ],
  pricing: [
    { id: "free", label: "Free", count: 127 },
    { id: "paid", label: "Paid", count: 120 },
  ],
  creator: [
    { id: "verified", label: "AGIPO Verified", count: 45 },
    { id: "partner", label: "Partner", count: 78 },
    { id: "community", label: "Community", count: 124 },
  ],
  rating: [
    { id: "rating4", label: "4+ stars", count: 156 },
    { id: "rating45", label: "4.5+ stars", count: 87 },
  ],
};

export const agents = [
  {
    id: "agent-1",
    title: "Customer Support Triage",
    description:
      "Automatically routes customer emails to the right team based on urgency and content.",
    tags: ["Support", "Email", "Classification"],
    rating: 4.8,
    reviews: 1234,
    usage: "1.2k uses",
    badge: "Free",
    initials: "CS",
    verified: true,
  },
  {
    id: "agent-2",
    title: "Financial Report Builder",
    description:
      "Pulls accounting data, calculates KPIs, and generates PDF reports automatically.",
    tags: ["Finance", "Reports", "Analytics"],
    rating: 4.9,
    reviews: 2156,
    usage: "2.1k uses",
    badge: "Free",
    initials: "FR",
    verified: true,
  },
  {
    id: "agent-3",
    title: "Blog Post Generator",
    description:
      "Researches topics, generates outlines, and creates SEO-optimized blog content with citations.",
    tags: ["Marketing", "Content", "SEO"],
    rating: 4.5,
    reviews: 890,
    usage: "890 uses",
    badge: "Pro",
    initials: "BP",
    verified: false,
  },
  {
    id: "agent-4",
    title: "Lead Enrichment Pipeline",
    description:
      "Enriches lead data with company info, validates emails, and updates CRM systems automatically.",
    tags: ["Data", "CRM", "Enrichment"],
    rating: 4.6,
    reviews: 1543,
    usage: "1.5k uses",
    badge: "Free",
    initials: "LE",
    verified: true,
  },
];

export const previewAgent = {
  id: "agent-1",
  title: "Customer Support Triage",
  creator: "AGIPO",
  verified: true,
  rating: 4.8,
  reviewCount: 1234,
  description:
    "This agent automatically analyzes incoming customer support emails, categorizes them by urgency and topic, and routes them to the appropriate team members.",
  features: [
    "Automatic email classification and routing",
    "Multi-language support (10+ languages)",
    "Urgency detection and escalation",
    "Integration with popular ticketing systems",
  ],
  requirements: ["Email access (Gmail, Outlook, or IMAP)", "CRM or ticketing system (optional)"],
  metrics: [
    { label: "Success Rate", value: "96%" },
    { label: "Avg Runtime", value: "2m" },
    { label: "Active Users", value: "1.2k" },
  ],
  reviews: [
    { author: "Sarah M.", rating: 5, text: "Game changer for our support team. Cut our response time by 40%!" },
    { author: "James L.", rating: 5, text: "Incredibly accurate classification. Worth every penny." },
  ],
};

export const creators = [
  { id: "creator-1", initials: "AG", name: "AGIPO Official", stats: "45 agents • 8.2k uses" },
  { id: "creator-2", initials: "CA", name: "ContentAI Partners", stats: "12 agents • 3.1k uses" },
  { id: "creator-3", initials: "DO", stats: "18 agents • 4.5k uses", name: "DataOps Inc" },
  { id: "creator-4", initials: "NS", name: "NLP Solutions", stats: "9 agents • 2.8k uses" },
];
