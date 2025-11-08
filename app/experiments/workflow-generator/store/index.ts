import { create } from "zustand";

import { createExecutionSlice } from "./executionSlice";
import { createWebcontainerSlice } from "./webcontainerSlice";
import { createWorkflowSlice } from "./workflowSlice";
import type { WorkflowGeneratorStore } from "./types";
import { createEditorSlice } from "./ui/editorSlice";

export const useWorkflowGeneratorStore = create<WorkflowGeneratorStore>()(
  (...args) => ({
    ...createWorkflowSlice(...args),
    ...createExecutionSlice(...args),
    ...createWebcontainerSlice(...args),
    ...createEditorSlice(...args),
  })
);

