import { Node, Edge } from "@xyflow/react";

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

export const initialNodes: WorkflowNode[] = [
  {
    id: "1",
    type: "code",
    position: { x: 0, y: 0 },
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
    position: { x: 300, y: 0 },
    data: {
      id: "2",
      title: "Format Message",
      code: `const cowsay = require('cowsay');
const readline = require('readline');

// This script reads a single line from standard input...
const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (line) => {
  // ...and uses that line as the text for the cow.
  console.log(cowsay.say({
      text : line,
      e : "oO",
      T : "U "
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

export const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
];
