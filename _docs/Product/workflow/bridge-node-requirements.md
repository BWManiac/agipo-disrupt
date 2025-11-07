# Bridge Node Requirements

## Purpose
- Make data flow relationships explicit in Spec view by inserting an auto-generated "Bridge" node between upstream and downstream nodes whenever a data edge is created.
- Provide a clear editing surface to map source outputs to target inputs, configure transformations, and surface contract violations.

## Core Behavior
- Bridge nodes exist only in Spec mode; Flow and Code modes display direct node-to-node edges to keep the canvas clean.
- Each bridge node represents a single upstream → downstream connection.
- Bridges are generated automatically when the user connects two nodes; deleting the connection removes the bridge.
- Bridge positioning: mid-point between the two nodes (React Flow handles layout) and locked while bridge is selected to tweak mappings.

## Data Model
- Extend `dataEdges` to capture `source: { nodeId, port }` and `target: { nodeId, port }` entries.
- Bridge nodes reference the relevant `dataEdge` entries and offer editing affordances (add/remove mappings, adapters).
- Each mapping row ties one upstream output to one downstream input. Multiple downstream inputs can point to the same source output.
- Support empty/unmapped inputs—bridge should highlight these as warnings.

## UI / Interaction Requirements
- Layout: two-column table (Left: source outputs, Right: target inputs). Rows equal the downstream node's input count.
- Rows: show name, type, optional description, and adapter badge if transformations are applied.
- Unmapped inputs: row should show status (e.g., "No mapping yet"), highlight in warning color, and provide quick action to assign a source.
- Hover / focus lines: when hovering a row, highlight the corresponding edge on the canvas and the relevant fields in both nodes.
- Add transformer: per-row action to open future configuration (placeholder badge for now).
- Bridge header: include node names (`Node A → Node B`) and summary (e.g., `2 of 3 inputs satisfied`).
- Editing actions: ability to select a source output from dropdown, clear mapping, or insert constant values (future).
- Accessibility: keyboard navigation across rows, input selectors, and actions.

## Contract Enforcement
- When user picks a source for a target input, validate type compatibility (including adapters). Show inline errors if mismatched.
- Prevent workflow execution if required inputs remain unmapped; surface error in bridge footer and orchestrator output.

## State Synchronization
- Bridge edits update `dataEdges` state in real time so orchestrator can use the mapping for execution.
- Removing or renaming outputs/inputs in node spec sections should cascade into bridges (e.g., auto-clear mapping with friendly warning).
- Undo/redo support: hooking into React Flow/Zustand history if possible.

## Future Considerations
- Optional collapse/expand toggles per bridge once layout proves stable.
- Support bridging to link nodes (e.g., transformations) that may introduce additional nodes between source and target downstream.
- Potential to render smaller badges on base nodes summarizing number of mapped inputs to avoid expanding every bridge.
