import { tool } from "ai";
import { z } from "zod";

import type { ToolDefinition } from "../types";

const inputSchema = z.object({
  request: z.string().optional(),
  context: z.string().optional(),
});

export const briefWriterTool: ToolDefinition = {
  id: "brief_writer",
  name: "Brief Writer",
  description: "Drafts campaign briefs aligned to current goals and guardrails.",
  runtime: "internal",
  run: tool({
    description: "Draft a campaign brief aligned to current goals and guardrails.",
    inputSchema,
    execute: async ({ request, context }) => {
      const summary = request ?? context ?? "campaign brief";
      return {
        message: "Drafted brief outline with objectives, audience, and CTA.",
        summary,
        runtime: "internal",
      };
    },
  }),
};
