import type { StateCreator } from "zustand";

import type { WorkflowGeneratorStore } from "../types";

export type WorkflowLayer = "flow" | "spec" | "code";
export type SidebarTab = "console" | "state" | "context" | "editor";

export interface EditorSliceState {
  activeSidebarTab: SidebarTab;
  editingNodeId: string | null;
  activeLayer: WorkflowLayer;
}

export interface EditorSliceActions {
  setSidebarTab: (tab: SidebarTab) => void;
  openEditor: (nodeId: string) => void;
  clearEditor: () => void;
  setActiveLayer: (layer: WorkflowLayer) => void;
}

export type EditorSlice = EditorSliceState & EditorSliceActions;

const DEFAULT_TAB: SidebarTab = "console";

export const createEditorSlice: StateCreator<
  WorkflowGeneratorStore,
  [],
  [],
  EditorSlice
> = (set) => ({
  activeSidebarTab: DEFAULT_TAB,
  editingNodeId: null,
  activeLayer: "flow",
  setSidebarTab: (tab) =>
    set(() => ({
      activeSidebarTab: tab,
    })),
  openEditor: (nodeId) =>
    set(() => ({
      activeSidebarTab: "editor",
      editingNodeId: nodeId,
    })),
  clearEditor: () =>
    set(() => ({
      activeSidebarTab: DEFAULT_TAB,
      editingNodeId: null,
    })),
  setActiveLayer: (layer: WorkflowLayer) =>
    set(() => ({
      activeLayer: layer,
    })),
});

