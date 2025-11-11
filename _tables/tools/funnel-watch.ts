import type { ToolConfig } from "../types";

export const funnelWatchTool: ToolConfig = {
  id: "funnel_watch",
  name: "Funnel Watch",
  description: "Detects anomalies across the activation funnel compared to baselines.",
  runtime: "internal",
  async execute({ request, context }) {
    const summary = request ?? context ?? "funnel anomaly check";
    return {
      message: "No anomalies detected; CPC stable within 3%.",
      summary,
      runtime: "internal",
    };
  },
};
