import type { StateCreator } from "zustand";

import {
  type ContractField,
  type WorkflowGeneratorStore,
} from "../types";

export interface NodeSpecSliceActions {
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
  updateNodeProcessStep: (
    nodeId: string,
    index: number,
    value: string
  ) => void;
  removeNodeProcessStep: (nodeId: string, index: number) => void;
}

export type NodeSpecSlice = NodeSpecSliceActions;

export const createNodeSpecSlice: StateCreator<
  WorkflowGeneratorStore,
  [],
  [],
  NodeSpecSlice
> = (set) => ({
  addNodeSpecInput: (nodeId: string) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                spec: {
                  ...node.data.spec,
                  inputs: node.data.spec.inputs.concat({
                    name: "",
                    type: "text",
                    description: "",
                    optional: false,
                  }),
                },
              },
            }
          : node
      ),
    })),
  updateNodeSpecInput: (nodeId: string, index: number, patch) =>
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id !== nodeId) return node;
        const inputs = node.data.spec.inputs.map((input, idx) =>
          idx === index ? { ...input, ...patch } : input
        );
        return {
          ...node,
          data: {
            ...node.data,
            spec: {
              ...node.data.spec,
              inputs,
            },
          },
        };
      }),
    })),
  removeNodeSpecInput: (nodeId: string, index: number) =>
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id !== nodeId) return node;
        const inputs = node.data.spec.inputs.filter(
          (_, idx) => idx !== index
        );
        return {
          ...node,
          data: {
            ...node.data,
            spec: {
              ...node.data.spec,
              inputs,
            },
          },
        };
      }),
    })),
  addNodeSpecOutput: (nodeId: string) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                spec: {
                  ...node.data.spec,
                  outputs: node.data.spec.outputs.concat({
                    name: "",
                    type: "text",
                    description: "",
                    optional: false,
                  }),
                },
              },
            }
          : node
      ),
    })),
  updateNodeSpecOutput: (nodeId: string, index: number, patch) =>
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id !== nodeId) return node;
        const outputs = node.data.spec.outputs.map((output, idx) =>
          idx === index ? { ...output, ...patch } : output
        );
        return {
          ...node,
          data: {
            ...node.data,
            spec: {
              ...node.data.spec,
              outputs,
            },
          },
        };
      }),
    })),
  removeNodeSpecOutput: (nodeId: string, index: number) =>
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id !== nodeId) return node;
        const outputs = node.data.spec.outputs.filter(
          (_, idx) => idx !== index
        );
        return {
          ...node,
          data: {
            ...node.data,
            spec: {
              ...node.data.spec,
              outputs,
            },
          },
        };
      }),
    })),
  addNodeProcessStep: (nodeId: string) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                spec: {
                  ...node.data.spec,
                  process: node.data.spec.process.concat(""),
                },
              },
            }
          : node
      ),
    })),
  updateNodeProcessStep: (
    nodeId: string,
    index: number,
    value: string
  ) =>
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id !== nodeId) return node;
        const process = node.data.spec.process.map((step, idx) =>
          idx === index ? value : step
        );
        return {
          ...node,
          data: {
            ...node.data,
            spec: {
              ...node.data.spec,
              process,
            },
          },
        };
      }),
    })),
  removeNodeProcessStep: (nodeId: string, index: number) =>
    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id !== nodeId) return node;
        const process = node.data.spec.process.filter(
          (_, idx) => idx !== index
        );
        return {
          ...node,
          data: {
            ...node.data,
            spec: {
              ...node.data.spec,
              process,
            },
          },
        };
      }),
    })),
});
