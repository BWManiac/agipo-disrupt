import type { StateCreator } from "zustand";

import type {
  EditorUiSlice,
  SidebarTab,
  WorkflowGeneratorStore,
} from "../../store/types";

const DEFAULT_TAB: SidebarTab = "console";

export const createEditorSlice: StateCreator<
  WorkflowGeneratorStore,
  [],
  [],
  EditorUiSlice
> = (set) => ({
  activeSidebarTab: DEFAULT_TAB,
  editingNodeId: null,
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
});

