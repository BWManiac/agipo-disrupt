export type Metric = {
  id: string;
  label: string;
  value: string;
  trendLabel: string;
  trendPositive?: boolean;
};

export type Task = {
  id: string;
  title: string;
  agentInitials: string;
  agentName?: string;
  status: "success" | "warning" | "error";
  meta: string;
};

export type KanbanColumn = {
  id: string;
  title: string;
  count: number;
  tasks: Task[];
};

export type ActivityItem = {
  id: string;
  type: "success" | "warning" | "error";
  label: string;
  description: string;
  time: string;
  showPulse?: boolean;
};

export type MarketplaceAgent = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  rating: number;
  reviews: number;
  usage: string;
  badge?: "free" | "pro";
};

export type Collaborator = {
  id: string;
  initials: string;
  name: string;
};

export const rotatingMessages = [
  "Automate support triage",
  "Generate financial reports",
  "Transform data workflows",
];

export const heroTrustCopy =
  "⚡ Agents run in your browser via WebContainers • Zero infrastructure required";

export const metrics: Metric[] = [
  {
    id: "agents-running",
    label: "Agents Running",
    value: "12",
    trendLabel: "+3 this week",
    trendPositive: true,
  },
  {
    id: "success-rate",
    label: "Success Rate",
    value: "94.2%",
    trendLabel: "+2.1% vs last week",
    trendPositive: true,
  },
  {
    id: "avg-turnaround",
    label: "Avg Turnaround",
    value: "2.3m",
    trendLabel: "-0.4m vs last week",
    trendPositive: true,
  },
  {
    id: "queued-tasks",
    label: "Queued Tasks",
    value: "47",
    trendLabel: "+12 pending",
    trendPositive: false,
  },
];

export const kanbanColumns: KanbanColumn[] = [
  {
    id: "backlog",
    title: "Backlog",
    count: 8,
    tasks: [
      {
        id: "task-backlog-1",
        title: "Process support tickets",
        agentInitials: "CS",
        status: "warning",
        meta: "Last run: 2h ago",
      },
      {
        id: "task-backlog-2",
        title: "Generate monthly report",
        agentInitials: "MR",
        status: "warning",
        meta: "Next run: Tomorrow 9 AM",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    count: 5,
    tasks: [
      {
        id: "task-progress-1",
        title: "Enrich lead data",
        agentInitials: "LE",
        status: "success",
        meta: "Started: 5m ago",
      },
      {
        id: "task-progress-2",
        title: "Create blog post",
        agentInitials: "CB",
        status: "success",
        meta: "Started: 12m ago",
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    count: 3,
    tasks: [
      {
        id: "task-review-1",
        title: "Validate email addresses",
        agentInitials: "VA",
        status: "warning",
        meta: "Completed: 15m ago",
      },
    ],
  },
  {
    id: "completed",
    title: "Completed",
    count: 24,
    tasks: [
      {
        id: "task-completed-1",
        title: "Upload to CRM",
        agentInitials: "UP",
        status: "success",
        meta: "Completed: 1h ago",
      },
      {
        id: "task-completed-2",
        title: "Scrape product data",
        agentInitials: "SC",
        status: "success",
        meta: "Completed: 2h ago",
      },
    ],
  },
];

export const activityItems: ActivityItem[] = [
  {
    id: "activity-1",
    type: "success",
    label: "Lead Enrichment",
    description: "completed successfully",
    time: "2 minutes ago",
    showPulse: true,
  },
  {
    id: "activity-2",
    type: "success",
    label: "Blog Creation",
    description: "agent started processing",
    time: "5 minutes ago",
    showPulse: true,
  },
  {
    id: "activity-3",
    type: "warning",
    label: "Email Validation",
    description: "needs review - 3 invalid addresses found",
    time: "15 minutes ago",
  },
  {
    id: "activity-4",
    type: "success",
    label: "CRM Upload",
    description: "completed - 47 records synced",
    time: "1 hour ago",
    showPulse: true,
  },
  {
    id: "activity-5",
    type: "error",
    label: "Data Scraping",
    description: "failed - connection timeout",
    time: "2 hours ago",
  },
  {
    id: "activity-6",
    type: "success",
    label: "Self-heal",
    description: "agent recovered from error automatically",
    time: "2 hours ago",
    showPulse: true,
  },
];

export const marketplaceAgents: MarketplaceAgent[] = [
  {
    id: "agent-1",
    title: "Customer Support Triage",
    description:
      "Automatically routes customer emails to the right team based on urgency and content.",
    tags: ["Support", "Email"],
    rating: 4.8,
    reviews: 1234,
    usage: "1.2k uses",
    badge: "free",
  },
  {
    id: "agent-2",
    title: "Blog Post Generator",
    description:
      "Researches topics, generates outlines, and creates SEO-optimized blog content.",
    tags: ["Marketing", "Content"],
    rating: 4.5,
    reviews: 890,
    usage: "890 uses",
    badge: "free",
  },
  {
    id: "agent-3",
    title: "Financial Report Builder",
    description:
      "Pulls accounting data, calculates KPIs, and generates PDF reports automatically.",
    tags: ["Ops", "Data"],
    rating: 4.9,
    reviews: 2156,
    usage: "2.1k uses",
    badge: "free",
  },
  {
    id: "agent-4",
    title: "Lead Enrichment Pipeline",
    description:
      "Enriches lead data with company info, validates emails, and updates CRM systems.",
    tags: ["Data", "Transformation"],
    rating: 4.6,
    reviews: 1543,
    usage: "1.5k uses",
    badge: "free",
  },
];

export const collaborators: Collaborator[] = [
  { id: "collab-1", initials: "JD", name: "Jordan Diaz" },
  { id: "collab-2", initials: "SM", name: "Sasha Malik" },
  { id: "collab-3", initials: "AK", name: "Aria Kim" },
];
