<!-- 35a4fe17-423d-4380-b59e-1d123941645a b2311f73-e8e2-4b27-acf0-2e17a5ad0d2b -->
# MVP Design: Node-Based Execution Engine

This document outlines the architecture and implementation plan for the Minimum Viable Product (MVP).

## 1. Core Vision

The MVP will create a visual, node-based workflow editor using React Flow. Users will be able to place nodes on a canvas, connect them, and execute the resulting graph entirely within the browser, powered by WebContainers.

## 2. Architecture

The system is composed of three primary layers:

### a. UI / Presentation Layer (React Flow)

-   **Canvas:** We will use `@xyflow/react` to render a node-based editor in `app/page.tsx`.
-   **Nodes:** Custom React components representing functions. For the MVP, we will create a simple text-based node that contains executable JavaScript code.
-   **Edges:** Default React Flow edges will connect nodes, signifying data flow from an output handle to an input handle.

### b. State Management Layer (Zustand)

-   A central Zustand store will manage the state of the graph, including an array of nodes and an array of edges.
-   This store will be the single source of truth for the UI and the execution layer.
-   File location: `lib/store.ts`

### c. Execution Layer (WebContainer)

-   **Singleton:** A singleton instance of `WebContainer` will be managed in `lib/webcontainer/singleton.ts`.
-   **Orchestration:** A function will read the graph state from Zustand, translate it into a series of shell commands (e.g., `node node_A.js | node node_B.js`), and execute it using `webcontainer.spawn()`.
-   **File System:** The orchestrator will write the code from each node into a virtual file within the WebContainer's file system before execution.

## 3. MVP Implementation Steps

The plan is to build this within the `_experiments/` directory to keep it isolated. [[memory:4885263]]

1.  **Setup Environment:**

    -   Install dependencies: `@xyflow/react`, `zustand`, `@webcontainer/api`.
    -   Configure `next.config.js` to set the necessary COOP/COEP headers for `SharedArrayBuffer`.

2.  **Build React Flow UI:**

    -   Create a new page at `app/flow/page.tsx` to host the React Flow canvas.
    -   Implement basic state management with Zustand to handle adding, updating, and connecting nodes.

3.  **Implement WebContainer Service:**

    -   Create the `WebContainer` singleton.
    -   Develop the orchestrator function that translates the Zustand state into an executable command.

4.  **End-to-End Test Case:**

    -   **Node A:** A node with the code `console.log("Hello");`
    -   **Node B:** A node with the code `const readline = require('readline'); const rl = readline.createInterface({ input: process.stdin }); rl.on('line', (line) => console.log(line + " World"));`
    -   Connect Node A to Node B.
    -   Trigger execution and verify the final output is "Hello World".

### To-dos

- [ ] Create `_docs/mvp_design.md` with the plan details.
- [ ] Install dependencies: `@xyflow/react`, `zustand`, `@webcontainer/api`.
- [ ] Configure `next.config.js` for WebContainer headers.
- [ ] Implement the basic React Flow canvas and Zustand store.
- [ ] Implement the WebContainer singleton and execution orchestrator.
- [ ] Build the end-to-end two-node test case.