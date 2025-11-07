# MVP Test Plan

This document outlines the 10 essential tests required to validate the MVP of the node-based execution engine.

### Core Functionality & Execution

1.  **Single Node Execution**:
    -   **Description:** A single node containing `console.log("Hello");` should execute and correctly output "Hello" to the terminal/log display.
    -   **Purpose:** Validates the entire pipeline from UI to execution for a single unit of work.

2.  **Two-Node Data Piping**:
    -   **Description:** Node A (`console.log("Hello");`) connected to Node B (reads from `stdin` and appends " World") must produce the final output "Hello World".
    -   **Purpose:** Tests the core data flow and piping between connected nodes.

3.  **Disconnected Graph Execution**:
    -   **Description:** If two nodes are on the canvas but not connected, they should execute as separate, parallel processes, not a piped command.
    -   **Purpose:** Ensures the orchestrator correctly interprets the graph's topology and doesn't pipe disconnected nodes.

### State Management & UI Interaction

4.  **Node Creation**:
    -   **Description:** A user can add a new node to the canvas, and the new node's state is correctly added to the Zustand store.
    -   **Purpose:** Verifies that the UI correctly updates the application's central state.

5.  **Node Deletion**:
    -   **Description:** A user can delete a node from the canvas, and its state is correctly removed from the Zustand store.
    -   **Purpose:** Ensures state is kept in sync when UI elements are removed.

6.  **Node Content Update**:
    -   **Description:** When a user edits the code inside a node, the corresponding state in the Zustand store is updated in real-time.
    -   **Purpose:** Confirms that the state reflects live changes from the user.

7.  **Edge Connection**:
    -   **Description:** A user can successfully draw a connection between two nodes, and the edge is registered in the Zustand store.
    -   **Purpose:** Validates the state management of graph connections.

### Robustness & Error Handling

8.  **Execution with Invalid Code**:
    -   **Description:** A node with syntactically incorrect JavaScript (e.g., `console.log('unterminated string`) should fail, and the execution error message from the WebContainer should be captured and displayed to the user.
    -   **Purpose:** Tests the system's ability to handle and report user code errors gracefully.

9.  **Executing an Empty Canvas**:
    -   **Description:** Clicking the "run" button when no nodes are on the canvas should not cause any errors or crashes.
    -   **Purpose:** Ensures the orchestrator can handle an empty graph state without failing.

10. **WebContainer Initialization**:
    -   **Description:** The WebContainer singleton must successfully boot upon loading the editor page.
    -   **Purpose:** Confirms that the execution environment is set up correctly and is ready for use.
