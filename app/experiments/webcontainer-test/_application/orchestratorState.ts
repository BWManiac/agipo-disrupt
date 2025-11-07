import type { Dispatch, SetStateAction } from "react";
import type { WorkflowNode } from "../_domain/workflow";
import type { WorkflowChain } from "../_domain/chainPlanner";

type WorkflowNodeStateSetter = Dispatch<
  SetStateAction<WorkflowNode[]>
>;

export const markChainRunning = (
  setNodes: WorkflowNodeStateSetter,
  chain: WorkflowChain,
  isRunning: boolean
): void => {
  const nodeIds = new Set(chain.map((node) => node.id));
  setNodes((prev) =>
    prev.map((node) =>
      nodeIds.has(node.id)
        ? { ...node, data: { ...node.data, isRunning } }
        : node
    )
  );
};

export const appendOutput = (
  setOutput: Dispatch<SetStateAction<string>>,
  chunk: string
): void => {
  setOutput((prev) => prev + chunk);
};

