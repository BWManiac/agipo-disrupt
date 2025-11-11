import { miraPatelAgent } from "./mira-patel";
import { noahReyesAgent } from "./noah-reyes";
import { elenaParkAgent } from "./elena-park";

export const agents = [miraPatelAgent, noahReyesAgent, elenaParkAgent];

export function getAgentById(id: string) {
  return agents.find((agent) => agent.id === id);
}
