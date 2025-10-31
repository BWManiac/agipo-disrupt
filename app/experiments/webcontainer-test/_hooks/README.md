# Logic Hooks

## Purpose

This directory contains the "brain" of the application. It abstracts all core business logic and state management into custom React hooks, separating it entirely from the UI layer.

## Design Philosophy & Key Decisions

The central `useOrchestrator` hook embodies the core architectural decisions of the MVP.

### 1. Stateless, Streaming Execution via Shell Piping (`|`)

-   **Decision:** We chose to use the WebContainer's built-in shell and the pipe (`|`) operator as the primary mechanism for data transfer between nodes. The React application constructs a command, but the data itself flows directly between processes inside the container, never entering the React state.
-   **Supports Product Requirement:** This directly enables the core feature of **passing data between visually connected nodes**. It is extremely performant and memory-efficient, creating an authentic and powerful stream-processing model.

### 2. Atomic, Ordered Commands via `sh -c "..."`

-   **Decision:** To solve race conditions and permission errors discovered during development, we construct a single, guaranteed-to-be-sequential command string (e.g., `cd /tmp && echo ... && node ...`).
-   **Supports Product Requirement:** This ensures **reliable and predictable execution** of user-created workflows, which is a fundamental requirement for the tool to be trustworthy.

### 3. Consistent Working Directory for Package Management

-   **Decision:** We force both the `npm install` and the `node` execution commands to operate from within the `/tmp` directory by prepending `cd /tmp && ...` to our shell commands.
-   **Supports Product Requirement:** This enables the crucial feature of **letting users install and use external npm packages**, as it guarantees the Node.js runtime can find the `node_modules` directory created by the installation process.

## Alternatives Considered

We considered an alternative architecture where **Zustand would act as a "data bus"**. In that model, each node's output would be saved to the React state, and the orchestrator would read from the state to provide input to the next node.

-   **Pros:** This would have offered superior step-by-step debuggability, as the output of every node would be visible in the state.
-   **Cons:** It would be significantly slower and would break the true streaming capabilities of the application.
-   **Decision:** For the MVP, we prioritized the performance and authentic stream-processing model of the shell-based approach.
