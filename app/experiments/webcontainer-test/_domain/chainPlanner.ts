import type { Workflow, WorkflowNode } from "./workflow";

export type WorkflowChain = WorkflowNode[];

export const findSourceNodes = ({ nodes, edges }: Workflow): WorkflowNode[] => {
  const targetIds = new Set(edges.map((edge) => edge.target));
  return nodes.filter((node) => !targetIds.has(node.id));
};

export const findNextNode = (
  nodeId: string,
  { nodes, edges }: Workflow
): WorkflowNode | null => {
  const nextEdge = edges.find((edge) => edge.source === nodeId);
  if (!nextEdge) {
    return null;
  }

  return (
    nodes.find((candidate) => candidate.id === nextEdge.target) ?? null
  );
};

export const buildChains = (workflow: Workflow): WorkflowChain[] => {
  const chains: WorkflowChain[] = [];
  const sources = findSourceNodes(workflow);

  for (const source of sources) {
    const chain: WorkflowChain = [source];
    let current: WorkflowNode | null = source;

    while (current) {
      const next = findNextNode(current.id, workflow);
      if (next) {
        chain.push(next);
        current = next;
      } else {
        current = null;
      }
    }

    chains.push(chain);
  }

  return chains;
};

