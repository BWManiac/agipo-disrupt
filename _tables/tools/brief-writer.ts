import type { ToolConfig } from "../types";

export const briefWriterTool: ToolConfig = {
  id: "brief_writer",
  name: "Brief Writer",
  description: "Drafts campaign briefs aligned to current goals and guardrails.",
  runtime: "internal",
  async execute({ request, context }) {
    const summary = request ?? context ?? "campaign brief";
    return {
      message: "Drafted brief outline with objectives, audience, and CTA.",
      summary,
      runtime: "internal",
    };
  },
};
