import { requirementsDigestTool } from "./requirements-digest";
import { launchTrackerTool } from "./launch-tracker";
import { stakeholderPulseTool } from "./stakeholder-pulse";
import { funnelWatchTool } from "./funnel-watch";
import { briefWriterTool } from "./brief-writer";
import { sentimentRouterTool } from "./sentiment-router";
export { summarizeRisksTool } from "./prototype-risk-summary";

export const tools = [
  requirementsDigestTool,
  launchTrackerTool,
  stakeholderPulseTool,
  funnelWatchTool,
  briefWriterTool,
  sentimentRouterTool,
];

export function getToolById(id: string) {
  return tools.find((tool) => tool.id === id);
}
