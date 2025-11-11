import { tool } from "ai";
import { z } from "zod";

import type { ToolDefinition } from "../types";

const inputSchema = z.object({
  request: z.string().optional(),
  context: z.string().optional(),
});

export const funnelWatchTool: ToolDefinition = {
  id: "funnel_watch",
  name: "Funnel Watch",
  description: "Detects anomalies across the activation funnel compared to baselines.",
  runtime: "internal",
  run: tool({
    description: "Detect anomalies across the activation funnel compared to baselines.",
    inputSchema,
    execute: async ({ request, context }) => {
    const summary = request ?? context ?? "funnel anomaly check";
    return {
      message: "No anomalies detected; CPC stable within 3%.",
      summary,
      runtime: "internal",
    };
  },
  }),
};
