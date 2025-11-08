/**
 * Workflow Generator store composition.
 *
 * Each slice stays in its own module (workflow, execution, webcontainer bridge,
 * UI/editor metadata, IO mapping).  This file stitches them together so
 * `useWorkflowGeneratorStore` exposes a single hook to the rest of the app.
 *
 * We keep this layer intentionally slim: no business logic, just the wiring.
 */
import { create } from "zustand";

import { createExecutionSlice } from "./executionSlice";
import { createWebcontainerSlice } from "./webcontainerSlice";
import { createWorkflowSlice } from "./workflowSlice";
import type { WorkflowGeneratorStore } from "./types";
import { createEditorSlice } from "./ui/editorSlice";
import { createIoMappingSlice } from "./ioMappingSlice";

export const useWorkflowGeneratorStore = create<WorkflowGeneratorStore>()(
  (...args) => ({
    ...createWorkflowSlice(...args),
    ...createExecutionSlice(...args),
    ...createWebcontainerSlice(...args),
    // Keep UI/editor state after data slices so view logic can rely on core data.
    ...createEditorSlice(...args),
    // Edge bindings come last because they may derive validation rules from previous slices.
    ...createIoMappingSlice(...args),
  })
);

