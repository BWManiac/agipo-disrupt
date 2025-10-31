# Initial State Configuration

## Purpose

This directory holds the static, initial state configuration for the application.

## Design Philosophy & Key Decisions

### Separation of Static Configuration from Dynamic Logic

-   **Decision:** The initial state of the canvas, defined in `initialNodes` and `initialEdges`, is exported from this standalone file. This data is treated as static configuration.
-   **Supports Product Requirement:** This design makes it trivial to **define and modify the default user experience** or create different starting "templates" for the canvas. A product manager or developer can change the default nodes, code, and connections without having to search for them inside complex application logic, making the app's starting "blueprint" easy to find and configure.
