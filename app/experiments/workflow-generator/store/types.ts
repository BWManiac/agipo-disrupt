import type {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
} from "@xyflow/react";

export type WorkflowLayer = "flow" | "spec" | "code";

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

export type WorkflowSliceState = {
  nodes: WorkflowNode[];
  edges: Edge[];
  activeLayer: WorkflowLayer;
};

export type WorkflowSliceActions = {
  onNodesChange: (changes: NodeChange<WorkflowNode>[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: () => void;
  updateNodeCode: (nodeId: string, code: string) => void;
  updateNodeFlowSummary: (nodeId: string, summary: string) => void;
  markNodesRunning: (nodeIds: string[], isRunning: boolean) => void;
  setActiveLayer: (layer: WorkflowLayer) => void;
};

export type WorkflowSlice = WorkflowSliceState & WorkflowSliceActions;

export type ExecutionSliceState = {
  output: string;
  packageName: string;
  isInstalling: boolean;
  isRunning: boolean;
};

export type ExecutionSliceActions = {
  setPackageName: (pkg: string) => void;
  resetOutput: () => void;
  appendOutput: (chunk: string) => void;
  installDependency: () => Promise<void>;
  runWorkflow: () => Promise<void>;
};

export type ExecutionSlice = ExecutionSliceState & ExecutionSliceActions;

export type WebcontainerSliceState = {
  isBooting: boolean;
  isReady: boolean;
};

export type WebcontainerSliceActions = {
  bootRuntime: () => Promise<void>;
  teardownRuntime: () => Promise<void>;
};

export type WebcontainerSlice = WebcontainerSliceState & WebcontainerSliceActions;

export type WorkflowGeneratorStore = WorkflowSlice &
  ExecutionSlice &
  WebcontainerSlice;

