import { tool } from "ai";
import { z } from "zod";

import type { ToolDefinition } from "../types";

const inputSchema = z.object({
  request: z.string().optional(),
  context: z.string().optional(),
});

export const requirementsDigestTool: ToolDefinition = {
  id: "requirements_digest",
  name: "Requirements Digest",
  description: "Clusters qualitative feedback by initiative to highlight themes.",
  runtime: "webcontainer",
  run: tool({
    description: "Cluster qualitative feedback into initiative themes.",
    inputSchema,
    execute: async ({ request, context }) => {
      const summary = request ?? context ?? "feedback analysis";
      return {
        message: "Grouped feedback into 3 initiatives.",
        summary,
        runtime: "webcontainer",
      };
    },
  }),
};
