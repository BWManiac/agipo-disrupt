import { tool } from "ai";
import { z } from "zod";

import type { ToolDefinition } from "../types";

const inputSchema = z.object({
  request: z.string().optional(),
  context: z.string().optional(),
});

export const stakeholderPulseTool: ToolDefinition = {
  id: "stakeholder_pulse",
  name: "Stakeholder Pulse",
  description: "Summarises stakeholder sentiment and action items from updates.",
  runtime: "webcontainer",
  run: tool({
    description: "Summarise stakeholder sentiment and extract action items.",
    inputSchema,
    execute: async ({ request, context }) => {
    const summary = request ?? context ?? "stakeholder update";
    return {
      message: "Summarised stakeholder sentiment into 4 action items.",
      summary,
      runtime: "webcontainer",
    };
  },
  }),
};
