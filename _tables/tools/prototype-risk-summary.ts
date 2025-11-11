import { tool } from "ai";
import { z } from "zod";

import type { ToolDefinition } from "../types";

const run = tool({
  description:
    "Summarize a list of product risks and identify the one that deserves the most attention.",
  inputSchema: z.object({
    risks: z
      .array(
        z.object({
          name: z.string(),
          detail: z.string().optional(),
          severity: z.enum(["low", "medium", "high"]).optional(),
        }),
      )
      .min(1, "Provide at least one risk to summarize."),
  }),
  execute: async ({ risks }) => {
    console.log("[summarize_risks] invoked", { count: risks.length });
    const highSeverity =
      risks.find((risk) => risk.severity === "high") ?? risks[0];

    const summary = risks
      .map(
        (risk, index) =>
          `${index + 1}. ${risk.name}${
            risk.detail ? ` — ${risk.detail}` : ""
          }${risk.severity ? ` (severity: ${risk.severity})` : ""}`,
      )
      .join("\n");

    const result = {
      summary,
      topRisk: highSeverity.name,
      recommendation: `Focus on “${highSeverity.name}” first to unblock progress.`,
    };

    console.log("[summarize_risks] result", result);
    return result;
  },
});

export const summarizeRisksTool: ToolDefinition = {
  id: "summarize_risks",
  name: "Summarize Risks",
  description:
    "Summarize a list of product risks and identify the one that deserves the most attention.",
  runtime: "internal",
  run,
};
