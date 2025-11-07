import type { StateCreator } from "zustand";

import {
  installDependency as installDependencyService,
  runWorkflow as runWorkflowService,
} from "../services/workflowExecutionService";
import type {
  ExecutionSlice,
  WorkflowGeneratorStore,
} from "./types";

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
});

