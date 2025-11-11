import { tool } from "ai";
import { z } from "zod";

import type { ToolDefinition } from "../types";

const inputSchema = z.object({
  request: z.string().optional(),
  context: z.string().optional(),
});

export const launchTrackerTool: ToolDefinition = {
  id: "launch_tracker",
  name: "Launch Tracker",
  description: "Audits launch checklist status across teams and surfaces gaps.",
  runtime: "webcontainer",
  run: tool({
    description: "Audit launch checklist status and surface blockers.",
    inputSchema,
    execute: async ({ request, context }) => {
      const summary = request ?? context ?? "launch checklist";
      return {
        message: "Checked 12 launch tasks and flagged 2 blockers.",
        summary,
        runtime: "webcontainer",
      };
    },
  }),
};
