# UI Components

## Purpose

This directory contains all the React components that make up the UI of the experiment page.

## Design Philosophy & Key Decisions

### Purely Presentational ("Dumb") Components

-   **Decision:** The components in this directory (`CodeNode`, `ControlPanel`, `Sidebar`) are designed to be "dumb," meaning they hold no application logic or state themselves. They receive all the data they need to display and all the functions they need to call (`onClick`, `onChange`, etc.) as props from the parent component.
-   **Supports Product Requirement:** This design choice creates a **clean, maintainable, and scalable UI**. It establishes a clear separation of concerns, allowing a developer to change the look and feel of the application (e.g., swapping a `Button` for a different component) without any risk of breaking the underlying execution logic contained in the `useOrchestrator` hook.
