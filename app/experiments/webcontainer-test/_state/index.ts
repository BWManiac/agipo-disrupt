import { Node, Edge } from "@xyflow/react";

export const initialNodes: Node[] = [
  {
    id: "1",
    type: "code",
    position: { x: 0, y: 0 },
    data: {
      id: "1",
      code: `// This node simply outputs a string to be used by the next node.
process.stdout.write("Data flows like a river!");`,
      isRunning: false,
    },
  },
  {
    id: "2",
    type: "code",
    position: { x: 300, y: 0 },
    data: {
      id: "2",
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
    },
  },
];

export const initialEdges: Edge[] = [
  { id: "e1-2", source: "1", target: "2" },
];
