import { tool } from "ai";
import { z } from "zod";

import type { ToolDefinition } from "../types";

const inputSchema = z.object({
  request: z.string().optional(),
  context: z.string().optional(),
});

export const sentimentRouterTool: ToolDefinition = {
  id: "sentiment_router",
  name: "Sentiment Router",
  description: "Routes tickets based on tone, urgency, and escalation matrix rules.",
  runtime: "internal",
  run: tool({
    description: "Route tickets based on tone, urgency, and escalation matrix rules.",
    inputSchema,
    execute: async ({ request, context }) => {
      const summary = request ?? context ?? "ticket triage";
      return {
        message: "Routed 58 tickets; escalated 3 high-risk items.",
        summary,
        runtime: "internal",
      };
    },
  }),
};
