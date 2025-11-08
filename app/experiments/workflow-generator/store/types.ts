/**
 * Centralised type exports for the Workflow Generator store.  This file keeps
 * the slice boundaries honest: every slice reads/writes state using these
 * TypeScript definitions so we catch mismatched shapes at compile time.
 *
 * Notable sections:
 * - `ContractField` now uses the business-friendly enums from `types/domain`.
 * - `IoMappingSlice*` describes the edge-binding state that powers the new edge editor.
 */

import type {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
} from "@xyflow/react";

import type {
  BusinessFieldType,
  BusinessListItemType,
  EdgeFieldRef,
  EdgeMapping,
  MatchResult,
} from "../types/domain";

export type WorkflowLayer = "flow" | "spec" | "code";

export type ContractField = {
  name: string;
  type: BusinessFieldType;
  itemType?: BusinessListItemType;
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
  updateNodeTitle: (nodeId: string, title: string) => void;
  addNodeSpecInput: (nodeId: string) => void;
  updateNodeSpecInput: (
    nodeId: string,
    index: number,
    patch: Partial<ContractField>
  ) => void;
  removeNodeSpecInput: (nodeId: string, index: number) => void;
  addNodeSpecOutput: (nodeId: string) => void;
  updateNodeSpecOutput: (
    nodeId: string,
    index: number,
    patch: Partial<ContractField>
  ) => void;
  removeNodeSpecOutput: (nodeId: string, index: number) => void;
  addNodeProcessStep: (nodeId: string) => void;
  updateNodeProcessStep: (nodeId: string, index: number, value: string) => void;
  removeNodeProcessStep: (nodeId: string, index: number) => void;
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

export type SidebarTab = "console" | "state" | "context" | "editor";

export type EditorUiSliceState = {
  activeSidebarTab: SidebarTab;
  editingNodeId: string | null;
};

export type EditorUiSliceActions = {
  setSidebarTab: (tab: SidebarTab) => void;
  openEditor: (nodeId: string) => void;
  clearEditor: () => void;
};

export type EditorUiSlice = EditorUiSliceState & EditorUiSliceActions;

export type IoMappingSliceState = {
  mappings: Record<string, EdgeMapping>;
  activeEdgeId: string | null;
};

export type IoMappingSliceActions = {
  /**
   * Track whichever edge the user just interacted with so the sidebar can swap
   * between node/edge editors.
   */
  setActiveEdge: (edgeId: string | null) => void;
  /**
   * Link a source field to a target field.  Returns a `MatchResult` so callers
   * can surface warnings about incompatible types without throwing runtime errors.
   */
  linkFields: (
    edgeId: string,
    from: EdgeFieldRef | undefined,
    to: EdgeFieldRef
  ) => MatchResult;
  /** Remove an existing binding for a target input. */
  unlinkField: (edgeId: string, to: EdgeFieldRef) => void;
  /**
   * Store a static/default value for targets when no upstream source is
   * available (e.g. constant parameters).
   */
  setStaticValue: (edgeId: string, to: EdgeFieldRef, value: string) => void;
  /** Cleanup hook for when an edge is deleted. */
  removeEdgeMapping: (edgeId: string) => void;
};

export type IoMappingSlice = IoMappingSliceState & IoMappingSliceActions;

export type WorkflowGeneratorStore = WorkflowSlice &
  ExecutionSlice &
  WebcontainerSlice &
  EditorUiSlice &
  IoMappingSlice;

