import { nanoid } from "nanoid";
import { type StateCreator } from "zustand";

import {
  installDependency as installDependencyService,
  runWorkflow as runWorkflowService,
} from "../../services/workflowExecutionService";
import type { WorkflowGeneratorStore } from "../types";

export interface ExecutionSliceState {
  output: string;
  packageName: string;
  isInstalling: boolean;
  isRunning: boolean;
  isSaving: boolean;
}

export interface ExecutionSliceActions {
  setPackageName: (pkg: string) => void;
  resetOutput: () => void;
  appendOutput: (chunk: string) => void;
  installDependency: () => Promise<void>;
  runWorkflow: () => Promise<void>;
  saveCurrentWorkflow: () => Promise<void>;
}

export type ExecutionSlice = ExecutionSliceState & ExecutionSliceActions;

export const createExecutionSlice: StateCreator<
  WorkflowGeneratorStore,
  [],
  [],
  ExecutionSlice
> = (set, get) => ({
  output: "",
  packageName: "cowsay",
  isInstalling: false,
  isRunning: false,
  isSaving: false,

  setPackageName: (pkg: string) =>
    set(() => ({
      packageName: pkg,
    })),

  resetOutput: () =>
    set(() => ({
      output: "",
    })),

  appendOutput: (chunk: string) =>
    set((state) => ({
      output: state.output + chunk,
    })),

  installDependency: async () => {
    const { packageName, appendOutput } = get();
    if (!packageName) {
      return;
    }

    set(() => ({
      isInstalling: true,
      output: `Installing ${packageName}...\n`,
    }));

    try {
      await installDependencyService(packageName, appendOutput);
      appendOutput("\n✅ Installation complete.\n");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown install failure.";
      appendOutput(`\n❌ Installation failed: ${message}\n`);
    } finally {
      set(() => ({
        isInstalling: false,
      }));
    }
  },

  runWorkflow: async () => {
    const {
      nodes,
      edges,
      markNodesRunning,
      resetOutput,
      appendOutput,
    } = get();

    resetOutput();
    set(() => ({
      isRunning: true,
    }));

    try {
      await runWorkflowService(
        { nodes, edges },
        appendOutput,
        {
          onChainStart: (chain) =>
            markNodesRunning(
              chain.map((node) => node.id),
              true
            ),
          onChainComplete: (chain) =>
            markNodesRunning(
              chain.map((node) => node.id),
              false
            ),
        }
      );
      appendOutput("\n✅ Workflow completed successfully.\n");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown execution failure.";
      appendOutput(`\n❌ Execution failed: ${message}\n`);
    } finally {
      set(() => ({
        isRunning: false,
      }));
      markNodesRunning(
        nodes.map((node) => node.id),
        false
      );
    }
  },

  saveCurrentWorkflow: async () => {
    set({ isSaving: true });
    const { nodes, edges, workflowName, currentWorkflowId } = get();

    // Use a more descriptive ID if the name is available
    const id = currentWorkflowId || workflowName.toLowerCase().replace(/\s+/g, '-') || nanoid();

    if (!workflowName) {
      alert("Please enter a name for the workflow before saving.");
      set({ isSaving: false });
      return;
    }

    const workflowData = {
      id,
      name: workflowName,
      description: "Workflow saved from the editor.", // Placeholder description
      nodes,
      edges,
    };

    try {
      const url = currentWorkflowId
        ? `/api/workflows/${currentWorkflowId}`
        : "/api/workflows";
      const method = currentWorkflowId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workflowData),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to save workflow. Server responded with ${response.status}`
        );
      }

      const savedWorkflow = await response.json();

      // If it was a new workflow, update the ID in the store
      if (!currentWorkflowId) {
        get().loadCompleteWorkflow(savedWorkflow); // Use existing loader to set state
      }

      alert("Workflow saved!");
    } catch (error) {
      console.error(error);
      alert("Error saving workflow.");
    } finally {
      set({ isSaving: false });
    }
  },
});

