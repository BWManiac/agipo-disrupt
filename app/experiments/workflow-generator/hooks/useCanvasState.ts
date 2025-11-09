import { useWorkflowGeneratorStore } from "../store";

/**
 * Manages the core state of the React Flow canvas, including nodes, edges,
 * and the handlers for when they change.
 */
export function useCanvasState() {
  const nodes = useWorkflowGeneratorStore((state) => state.nodes);
  const onNodesChange = useWorkflowGeneratorStore(
    (state) => state.onNodesChange
  );
  const edges = useWorkflowGeneratorStore((state) => state.edges);
  const onEdgesChange = useWorkflowGeneratorStore(
    (state) => state.onEdgesChange
  );
  const onConnect = useWorkflowGeneratorStore((state) => state.onConnect);
  const addNode = useWorkflowGeneratorStore((state) => state.addNode);

  // New state for workflow identity
  const workflowName = useWorkflowGeneratorStore((state) => state.workflowName);
  const currentWorkflowId = useWorkflowGeneratorStore(
    (state) => state.currentWorkflowId
  );
  const loadCompleteWorkflow = useWorkflowGeneratorStore(
    (state) => state.loadCompleteWorkflow
  );
  const resetWorkflowState = useWorkflowGeneratorStore(
    (state) => state.resetWorkflowState
  );

  return {
    nodes,
    onNodesChange,
    edges,
    onEdgesChange,
    onConnect,
    addNode,
    workflowName,
    currentWorkflowId,
    loadCompleteWorkflow,
    resetWorkflowState,
  };
}
