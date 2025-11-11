export type AgentStatus = "active" | "paused" | "attention";

export type AgentConfig = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: AgentStatus;
  description: string;
  systemPrompt: string;
  model: string;
  toolIds: string[];
  quickPrompts: string[];
  objectives: string[];
  guardrails: string[];
  highlight: string;
  lastActivity: string;
  metrics: Array<{ label: string; value: string }>;
  assignedWorkflows: string[];
  capabilities: string[];
  insights: Array<{ title: string; detail: string; type: "question" | "opportunity" | "risk" }>;
  activities: Array<{ title: string; timestamp: string; summary: string; impact: string }>;
  feedback: Array<{ author: string; comment: string; timestamp: string }>;
};

export type ToolConfig = {
  id: string;
  name: string;
  description: string;
  runtime: "webcontainer" | "internal" | "http" | string;
  execute: (payload: { request?: string; context?: string }) => Promise<{
    message: string;
    summary: string;
    runtime: string;
  }>;
};
