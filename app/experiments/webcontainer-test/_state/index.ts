import { initialWorkflow } from "./initialWorkflow";

export type {
  ContractField,
  WorkflowNode,
  WorkflowNodeData,
} from "../_domain/workflow";
export { createWorkflow } from "../_domain/workflow";

export { initialWorkflow };

export const initialNodes = initialWorkflow.nodes;
export const initialEdges = initialWorkflow.edges;
