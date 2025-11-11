import { miraPatelAgent } from "./mira-patel";
import { noahReyesAgent } from "./noah-reyes";
import { elenaParkAgent } from "./elena-park";
import { alexKimAgent } from "./alex-kim";

export const agents = [miraPatelAgent, noahReyesAgent, elenaParkAgent, alexKimAgent];

export function getAgentById(id: string) {
  return agents.find((agent) => agent.id === id);
}
