# AGIPo: MVP Experiment Guide

This document explains how to test the current Minimum Viable Product (MVP) of the node-based execution engine and provides a summary of how it works.

## How to Test the MVP

The experiment page demonstrates a key feature: running code that depends on an external npm package, with data being passed between nodes.

Follow these steps exactly to see the full workflow:

1.  **Navigate to the Experiment:** Open the application and click the "Go to MVP Experiment" link on the homepage. You will see two nodes on the canvas, already connected.

2.  **Inspect the Code (Optional):** You can resize the code editor within each node by dragging the handle in the bottom-right corner of the text area.
    *   **Node 1** simply outputs a string.
    *   **Node 2** uses the `cowsay` package to display a message it receives from its input.

3.  **Step 1: Run (and watch it fail):**
    *   Click the **"Run"** button.
    *   **Observe:** In the right-hand panel, make sure the **"Console"** tab is selected. The console will show a `MODULE_NOT_FOUND` error. This is expected! The code fails because the `cowsay` package has not yet been installed in the browser's container environment.

4.  **Step 2: Install the Dependency:**
    *   Click the **"Install"** button.
    *   **Observe:** The **"Console"** tab will show the live installation logs from `npm`. Wait for it to complete.

5.  **Step 3: Run Again (and watch it succeed):**
    *   Once the installation is finished, click the **"Run"** button again.
    *   **Observe:** The **"Console"** tab will now display an ASCII cow saying "Data flows like a river!". This proves the entire end-to-end flow is working.

---

## How It Works: A Technical Overview

The system is a self-contained development environment running entirely in your browser. It is composed of three layers:

### 1. Presentation Layer (React Flow)
The interactive canvas, nodes, and edges are rendered using `@xyflow/react`. The state of this UI (the position of nodes, their connections, and the code inside them) is managed by React.

### 2. Execution Layer (WebContainer)
We use the `@webcontainer/api` to boot a complete Node.js environment inside a browser tab. This environment has its own isolated file system and shell.

### 3. The Orchestrator (`onRun` function)
When you click "Run", a function analyzes the graph's state and constructs a single, powerful shell command to be executed inside the WebContainer. For the default example, this command does the following in one atomic operation:
1.  **`cd /tmp`**: Changes into the temporary directory. This is crucial for ensuring all parts of the process know where to find files.
2.  **`echo '...' > /tmp/node-1.js`**: Creates the first script file.
3.  **`echo '...' > /tmp/node-2.js`**: Creates the second script file.
4.  **`node /tmp/node-1.js | node /tmp/node-2.js`**: Executes the scripts and uses the shell's **pipe (`|`) operator** to send the standard output of the first script directly into the standard input of the second. This is how data is "passed" between nodes.

### Key Learnings
*   **Permissions:** The WebContainer is a sandboxed Linux environment. We can only write files to the `/tmp` directory.
*   **Package Installation:** The `npm install` command must be run from the same working directory (`/tmp`) that our `node` processes will execute from. This ensures the `node_modules` folder is visible to the `require()` function.
*   **Execution Safety:** We use a single `sh -c "..."` command with `&&` operators to chain file-writing and execution. This prevents race conditions where the `node` process might start before its script file has been fully written to the virtual file system.
