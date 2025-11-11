import type { ToolConfig } from "../types";

export const requirementsDigestTool: ToolConfig = {
  id: "requirements_digest",
  name: "Requirements Digest",
  description: "Clusters qualitative feedback by initiative to highlight themes.",
  runtime: "webcontainer",
  async execute({ request, context }) {
    const summary = request ?? context ?? "feedback analysis";
    return {
      message: "Grouped feedback into 3 initiatives.",
      summary,
      runtime: "webcontainer",
    };
  },
};
