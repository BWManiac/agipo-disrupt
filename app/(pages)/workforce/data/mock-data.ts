export type AgentStatus = "active" | "paused" | "attention";

export type AgentSummary = {
  id: string;
  name: string;
  role: string;
  description: string;
  status: AgentStatus;
  avatar: string;
  lastActivity: string;
  highlight: string;
  metrics: Array<{ label: string; value: string }>;
  capabilities: string[];
  assignedWorkflows: string[];
};

export type AgentActivity = {
  title: string;
  timestamp: string;
  summary: string;
  impact: string;
};

export type AgentInsight = {
  title: string;
  detail: string;
  type: "question" | "opportunity" | "risk";
};

export type AgentToolUsage = {
  name: string;
  description: string;
  lastCalled: string;
  successRate: string;
  inputs?: string[];
  outputs?: string[];
  domains?: string[];
  steps?: string[]; // simple workflow mapping representation
};

export type AgentRecord = AgentSummary & {
  objectives: string[];
  guardrails: string[];
  activities: AgentActivity[];
  insights: AgentInsight[];
  tools: AgentToolUsage[];
  feedback: Array<{ author: string; comment: string; timestamp: string }>;
  quickPrompts: string[];
};

export const agents: AgentRecord[] = [
  {
    id: "pm",
    name: "Mira Patel",
    role: "Product Manager",
    description:
      "Synthesises feedback, prioritises roadmap items, and keeps delivery aligned with business goals.",
    status: "active",
    avatar: "🧭",
    lastActivity: "Drafted Q2 roadmap update 12m ago",
    highlight: "Identified 3 risks blocking the self-service onboarding initiative.",
    metrics: [
      { label: "Active initiatives", value: "5" },
      { label: "RAG health", value: "Green" },
    ],
    capabilities: ["Roadmap synthesis", "Launch comms", "Stakeholder pulse"],
    assignedWorkflows: [
      "Weekly Voice of Customer digest",
      "Launch-critical risk tracker",
    ],
    objectives: ["Accelerate PLG roadmap", "Improve onboarding completion"],
    guardrails: ["Escalate spend > $10k", "Respect enterprise release schedule"],
    quickPrompts: [
      "How confident are we in the onboarding launch?",
      "Summarise risks for the exec sync",
      "Draft stakeholder update for analytics parity",
    ],
    activities: [
      {
        title: "Story map refresh",
        timestamp: "Today · 10:24",
        summary: "Organised 14 discovery notes into 3 opportunity themes.",
        impact: "Proposed swapping sprint 18 stories with higher-signal items.",
      },
      {
        title: "Launch readiness review",
        timestamp: "Yesterday · 17:05",
        summary: "Flagged missing billing integration checklist for beta launch.",
        impact: "Sent tasks to Ops + PMM for follow-up.",
      },
      {
        title: "Stakeholder digest",
        timestamp: "Mon · 08:40",
        summary: "Summarised exec feedback from QBR recordings.",
        impact: "Recommended confidence downgrade on onboarding initiative.",
      },
    ],
    insights: [
      {
        title: "Need approval: Delay onboarding rollout?",
        detail: "Enabling SMS verification would extend schedule by 1 sprint. Approve or decline adjustment?",
        type: "question",
      },
      {
        title: "Opportunity: PLG activation playbook",
        detail: "Pattern emerging from self-serve interviews suggests quick win with new activation checklist.",
        type: "opportunity",
      },
      {
        title: "Risk: Research bandwidth",
        detail: "User research agent is over capacity; backlog of 6 sessions still un-analysed.",
        type: "risk",
      },
    ],
    tools: [
      {
        name: "requirements_digest",
        description: "Clusters qualitative feedback by initiative.",
        lastCalled: "Today · 10:18",
        successRate: "98%",
        inputs: ["Interview notes", "Support tickets", "Sales calls"],
        outputs: ["Opportunity themes", "Initiative clusters"],
        domains: ["Product feedback", "Customer voice"],
        steps: [
          "Collect notes from sources",
          "Chunk and embed text",
          "Cluster by similarity",
          "Summarise per cluster",
        ],
      },
      {
        name: "launch_tracker",
        description: "Audits launch checklist status across teams.",
        lastCalled: "Yesterday · 16:57",
        successRate: "92%",
        inputs: ["Team checklists", "Issue trackers"],
        outputs: ["Status report", "Risk items"],
        domains: ["Release management"],
        steps: ["Fetch checklists", "Compare to milestones", "Flag gaps", "Compose summary"],
      },
      {
        name: "stakeholder_pulse",
        description: "Summarises stakeholder sentiment and action items.",
        lastCalled: "Mon · 08:32",
        successRate: "95%",
        inputs: ["Meeting notes", "Emails", "QBR docs"],
        outputs: ["Sentiment score", "Action item list"],
        domains: ["Stakeholder mgmt"],
        steps: ["Extract statements", "Score sentiment", "Summarise asks", "Draft follow-ups"],
      },
    ],
    feedback: [
      {
        author: "Priya Desai",
        comment: "Great synthesis on onboarding risks—include projected revenue impact next time.",
        timestamp: "Yesterday · 18:12",
      },
      {
        author: "Leo Campos",
        comment: "Roadmap draft looked solid. Let's weave in analytics gating requirements earlier.",
        timestamp: "Mon · 11:48",
      },
    ],
  },
  {
    id: "marketing",
    name: "Noah Reyes",
    role: "Growth Marketing",
    description: "Creates campaign briefs, runs experiments, and monitors performance anomalies.",
    status: "attention",
    avatar: "📈",
    lastActivity: "Paused newsletter experiment awaiting creative",
    highlight: "Requests final approval on pricing page copy refresh.",
    metrics: [
      { label: "Active campaigns", value: "4" },
      { label: "Anomalies", value: "2" },
    ],
    capabilities: ["Email sequencing", "Experiment design", "Attribution insights"],
    assignedWorkflows: ["Weekly campaign pulse", "Paid channel anomaly alerts"],
    objectives: ["Increase activation by 12%", "Ship pricing refresh"],
    guardrails: ["Budget cap $15k/mo", "Compliance review for GA content"],
    quickPrompts: [
      "What campaigns need approval today?",
      "Share anomalies in paid channels",
      "Draft nurture email for activation",
    ],
    activities: [
      {
        title: "Newsletter test",
        timestamp: "Today · 09:15",
        summary: "Configured A/B test for onboarding nurture sequence.",
        impact: "Awaiting creative asset upload from Design agent.",
      },
      {
        title: "Paid search alert",
        timestamp: "Yesterday · 14:22",
        summary: "Detected CPC spike on onboarding keywords.",
        impact: "Recommended pausing two variants.",
      },
    ],
    insights: [
      {
        title: "Approval needed: Pricing copy",
        detail: "Draft ready in Notion. Provide final comments by Friday for launch.",
        type: "question",
      },
      {
        title: "Opportunity: Lifecycle webinars",
        detail: "Self-serve users with low activation respond well to onboarding webinars—consider weekly session.",
        type: "opportunity",
      },
    ],
    tools: [
      {
        name: "funnel_watch",
        description: "Tracks activation funnel and flags anomalies.",
        lastCalled: "Yesterday · 14:20",
        successRate: "88%",
      },
      {
        name: "brief_writer",
        description: "Generates campaign briefs based on current goals.",
        lastCalled: "Today · 09:10",
        successRate: "90%",
      },
    ],
    feedback: [
      {
        author: "Amelia Chen",
        comment: "Need more visibility into creative dependencies—flag earlier please.",
        timestamp: "Today · 09:30",
      },
    ],
  },
  {
    id: "support",
    name: "Elena Park",
    role: "Support Operations",
    description: "Routes tickets, prepares weekly ops briefs, and monitors SLA risk.",
    status: "paused",
    avatar: "🛟",
    lastActivity: "Paused by Ops for policy refresh",
    highlight: "Will resume once new escalation matrix is uploaded.",
    metrics: [
      { label: "Tickets triaged", value: "124" },
      { label: "SLA risk", value: "Stable" },
    ],
    capabilities: ["Auto triage", "Sentiment routing", "Weekly ops digest"],
    assignedWorkflows: ["Daily triage run", "Weekly ops briefing"],
    objectives: ["Reduce escalations", "Improve handoffs"],
    guardrails: ["Escalate VIP within 10m", "No bulk closures"],
    quickPrompts: [
      "Any tickets breaching SLA?",
      "Summarise escalation status",
      "Prepare weekly ops briefing outline",
    ],
    activities: [
      {
        title: "Escalation matrix update",
        timestamp: "Mon · 13:05",
        summary: "Awaiting new policy upload before resuming triage runs.",
        impact: "Ops team to provide updated matrix by Wed.",
      },
    ],
    insights: [
      {
        title: "Action: Provide updated policy",
        detail: "Agent on standby until you upload revised escalation matrix.",
        type: "question",
      },
    ],
    tools: [
      {
        name: "sentiment_router",
        description: "Routes tickets based on tone and urgency.",
        lastCalled: "Sun · 19:45",
        successRate: "97%",
      },
    ],
    feedback: [],
  },
];
