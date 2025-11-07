import type { Edge, Node } from "@xyflow/react";

export type ContractField = {
  name: string;
  type: string;
  description?: string;
  optional?: boolean;
};

export type WorkflowNodeData = {
  id: string;
  title: string;
  code: string;
  isRunning: boolean;
  flow: {
    summary: string;
  };
  spec: {
    inputs: ContractField[];
    process: string[];
    outputs: ContractField[];
  };
};

export type WorkflowNode = Node<WorkflowNodeData>;

export type Workflow = {
  nodes: WorkflowNode[];
  edges: Edge[];
};

export const createWorkflow = (
  nodes: WorkflowNode[],
  edges: Edge[]
): Workflow => ({
  nodes,
  edges,
});


