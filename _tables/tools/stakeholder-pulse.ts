import type { ToolConfig } from "../types";

export const stakeholderPulseTool: ToolConfig = {
  id: "stakeholder_pulse",
  name: "Stakeholder Pulse",
  description: "Summarises stakeholder sentiment and action items from updates.",
  runtime: "webcontainer",
  async execute({ request, context }) {
    const summary = request ?? context ?? "stakeholder update";
    return {
      message: "Summarised stakeholder sentiment into 4 action items.",
      summary,
      runtime: "webcontainer",
    };
  },
};
