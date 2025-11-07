import type { Node } from "@xyflow/react";

import type { WorkflowNode, WorkflowNodeData } from "../_domain/workflow";

export type WorkflowLayer = "flow" | "spec" | "code";

export type AugmentedWorkflowNode = Node<
  WorkflowNodeData & {
    onChange: (id: string, code: string) => void;
    onFlowChange: (id: string, summary: string) => void;
    activeLayer: WorkflowLayer;
  }
>;

type AugmentationConfig = {
  onCodeChange: (id: string, code: string) => void;
  onFlowChange: (id: string, summary: string) => void;
  activeLayer: WorkflowLayer;
};

export const toAugmentedNodes = (
  nodes: WorkflowNode[],
  config: AugmentationConfig
): AugmentedWorkflowNode[] =>
  nodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      onChange: config.onCodeChange,
      onFlowChange: config.onFlowChange,
      activeLayer: config.activeLayer,
    },
  }));

export const toContracts = (nodes: WorkflowNode[]) =>
  nodes.map((node) => ({
    id: node.id,
    title: node.data.title,
    flow: node.data.flow,
    spec: node.data.spec,
  }));

