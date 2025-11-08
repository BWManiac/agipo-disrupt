import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type EdgeChange,
  type NodeChange,
} from "@xyflow/react";
import type { StateCreator } from "zustand";

import type {
  WorkflowGeneratorStore,
  WorkflowLayer,
  WorkflowNode,
  WorkflowSlice,
} from "./types";

const generateNodeId = () => Math.random().toString(36).slice(2, 6);

const initialNodes: WorkflowNode[] = [
  {
    id: "1",
    type: "code",
    position: { x: -100, y: 200 },
    data: {
      id: "1",
      title: "Collect Input",
      code: `// This node simply outputs a string to be used by the next node.
process.stdout.write("Data flows like a river!");`,
      isRunning: false,
      flow: {
        summary:
          "Listen for the source message, tidy it up, and pass it downstream.",
      },
      spec: {
        inputs: [
          {
            name: "message",
            type: "string",
            description: "Plain text captured from the requester.",
          },
        ],
        process: [
          "Trim whitespace and normalize spacing.",
          "Remove unsupported characters.",
          "Emit a clean string for the next node.",
        ],
        outputs: [
          {
            name: "cleanMessage",
            type: "string",
            description: "Sanitized text ready for formatting.",
          },
        ],
      },
    },
  },
  {
    id: "2",
    type: "code",
    position: { x: 200, y: 200 },
    data: {
      id: "2",
      title: "Format Message",
      code: `const cowsay = require('cowsay');
const readline = require('readline');

const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (line) => {
  console.log(cowsay.say({
    text: line,
    e: 'oO',
    T: 'U '
  }));
});`,
      isRunning: false,
      flow: {
        summary:
          "Apply the cowsay persona to the cleaned message and render ASCII art.",
      },
      spec: {
        inputs: [
          {
            name: "cleanMessage",
            type: "string",
            description: "Sanitized text from the upstream node.",
          },
        ],
        process: [
          "Load cowsay template and tone modifiers.",
          "Wrap lines to keep width manageable.",
          "Render final ASCII output.",
        ],
        outputs: [
          {
            name: "asciiArt",
            type: "string",
            description: "Cowsay-formatted string for display.",
          },
        ],
      },
    },
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }] as const;

export const createWorkflowSlice: StateCreator<
  WorkflowGeneratorStore,
  [],
  [],
  WorkflowSlice
> = (set) => ({
  nodes: initialNodes,
  edges: initialEdges.map((edge) => ({ ...edge })),
  activeLayer: "flow",

  onNodesChange: (changes: NodeChange<WorkflowNode>[]) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),

  onEdgesChange: (changes: EdgeChange[]) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),

  onConnect: (connection: Connection) =>
    set((state) => ({
      edges: addEdge(connection, state.edges),
    })),

  addNode: () =>
    set((state) => {
      const id = generateNodeId();
      const newNode: WorkflowNode = {
        id,
        type: "code",
        position: {
          x: state.nodes.length * 220 - 100,
          y: (state.nodes.length % 3) * 120,
        },
        data: {
          id,
          title: `Node ${id}`,
          code: "// New node — write your transformation here.",
          isRunning: false,
          flow: {
            summary:
              "Describe this step to help teammates understand the transformation.",
          },
          spec: {
            inputs: [],
            process: ["Document the transformation logic here."],
            outputs: [],
          },
        },
      };

      return {
        nodes: state.nodes.concat(newNode),
      };
    }),

  updateNodeCode: (nodeId: string, code: string) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                code,
              },
            }
          : node
      ),
    })),

  updateNodeFlowSummary: (nodeId: string, summary: string) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                flow: {
                  ...node.data.flow,
                  summary,
                },
              },
            }
          : node
      ),
    })),

  markNodesRunning: (nodeIds: string[], isRunning: boolean) =>
    set((state) => {
      const idSet = new Set(nodeIds);
      return {
        nodes: state.nodes.map((node) =>
          idSet.has(node.id)
            ? {
                ...node,
                data: {
                  ...node.data,
                  isRunning,
                },
              }
            : node
        ),
      };
    }),

  setActiveLayer: (layer: WorkflowLayer) =>
    set(() => ({
      activeLayer: layer,
    })),

  updateNodeTitle: (nodeId: string, title: string) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? {
              ...node,
              data: {
                ...node.data,
                title: title || node.data.title,
              },
            }
          : node
      ),
    })),

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
                    type: "",
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
        const inputs = node.data.spec.inputs.filter((_, idx) => idx !== index);
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
                    type: "",
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
        const outputs = node.data.spec.outputs.filter((_, idx) => idx !== index);
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

  updateNodeProcessStep: (nodeId: string, index: number, value: string) =>
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
        const process = node.data.spec.process.filter((_, idx) => idx !== index);
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

