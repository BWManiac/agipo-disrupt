import type { AgentConfig } from "../types";

export const alexKimAgent: AgentConfig = {
  id: "engineering",
  name: "Alex Kim",
  role: "Engineering Lead",
  avatar: "⚙️",
  status: "active",
  description:
    "Monitors sprint health, reviews technical debt, and surfaces blockers before they escalate.",
  systemPrompt:
    "You are Alex Kim, an AI engineering lead. Track sprint progress, flag technical risks, and recommend prioritization shifts when needed.",
  model: "google/gemini-2.5-pro",
  toolIds: ["requirements_digest", "launch_tracker"],
  quickPrompts: [
    "What blockers are we facing this sprint?",
    "Review technical debt priorities",
    "Summarize testing coverage gaps",
  ],
  objectives: ["Reduce sprint slippage", "Pay down critical tech debt"],
  guardrails: ["No prod deploys Friday afternoons", "All migrations require staging validation"],
  highlight: "Flagged 2 blockers in current sprint that need immediate escalation.",
  lastActivity: "Reviewed sprint velocity 2h ago",
  metrics: [
    { label: "Active sprints", value: "2" },
    { label: "Blockers", value: "2" },
  ],
  assignedWorkflows: ["Daily standup digest", "Sprint health tracker"],
  capabilities: ["Sprint monitoring", "Tech debt analysis", "Release coordination"],
  insights: [
    {
      title: "Question: Extend sprint for API refactor?",
      detail: "Authentication refactor is 60% complete. Extend by 3 days or punt to next sprint?",
      type: "question",
    },
    {
      title: "Risk: Test coverage declining",
      detail: "Unit test coverage dropped from 78% to 71% in the last two sprints.",
      type: "risk",
    },
  ],
  activities: [
    {
      title: "Sprint blocker review",
      timestamp: "Today · 14:30",
      summary: "Identified database migration dependency blocking feature work.",
      impact: "Escalated to platform team for priority bump.",
    },
    {
      title: "Tech debt grooming",
      timestamp: "Yesterday · 10:15",
      summary: "Reviewed backlog and recommended retiring legacy API endpoints.",
      impact: "Proposed 4-week deprecation timeline.",
    },
  ],
  feedback: [
    {
      author: "Jordan Lee",
      comment: "Great catch on the auth refactor timeline. Let's extend the sprint.",
      timestamp: "Today · 15:10",
    },
  ],
};

