import { nanoid } from "nanoid";

import { useWorkflowGeneratorStore } from "../store";
import type {
  ToolResult,
  ToolIntent,
  UpdateNodeLayerIntent,
  AddNodeIntent,
  DeleteNodeIntent,
  ConnectNodesIntent,
  RepositionNodesIntent,
} from "./toolIntents";
import type { WorkflowNode } from "../store/types";

const generateNodeId = () => Math.random().toString(36).slice(2, 6);

const applyUpdateNodeLayer = (intent: UpdateNodeLayerIntent) => {
  useWorkflowGeneratorStore.setState((state) => {
    const nodes = state.nodes.map((node) => {
      if (node.id !== intent.nodeId) return node;

      const dataPatch: WorkflowNode["data"] = {
        ...node.data,
        ...(intent.changes.title ? { title: intent.changes.title } : {}),
        ...(intent.changes.code ? { code: intent.changes.code } : {}),
        flow: {
          ...node.data.flow,
          ...(intent.changes.flowSummary
            ? { summary: intent.changes.flowSummary }
            : {}),
        },
        spec: {
          ...node.data.spec,
          ...(intent.changes.spec?.inputs
            ? { inputs: intent.changes.spec.inputs }
            : {}),
          ...(intent.changes.spec?.outputs
            ? { outputs: intent.changes.spec.outputs }
            : {}),
          ...(intent.changes.spec?.process
            ? { process: intent.changes.spec.process }
            : {}),
        },
      };

      return {
        ...node,
        data: dataPatch,
      };
    });

    return { nodes };
  });
};

const applyAddNode = (intent: AddNodeIntent) => {
  useWorkflowGeneratorStore.setState((state) => {
    const id = generateNodeId();
    const nodeId = id;

    const newNode: WorkflowNode = {
      id: nodeId,
      type: "code",
      position:
        intent.node.position ??
        {
          x: state.nodes.length * 220 - 100,
          y: (state.nodes.length % 3) * 120,
        },
      data: {
        id: nodeId,
        title: intent.node.title ?? `Node ${nodeId}`,
        code:
          intent.node.code ??
          "// New node created via agent tool. Provide implementation.",
        isRunning: false,
        flow: {
          summary:
            intent.node.flowSummary ??
            "Describe this step to help teammates understand the transformation.",
        },
        spec: {
          inputs: intent.node.spec?.inputs ?? [],
          process: intent.node.spec?.process ?? ["Document the transformation logic here."],
          outputs: intent.node.spec?.outputs ?? [],
        },
      },
    };

    const nextEdges = [...state.edges];
    if (intent.connections?.from) {
      const edgeId = `e-${intent.connections.from}-${nodeId}-${nanoid(4)}`;
      if (
        !nextEdges.some(
          (edge) =>
            edge.source === intent.connections?.from && edge.target === nodeId
        )
      ) {
        nextEdges.push({
          id: edgeId,
          source: intent.connections.from,
          target: nodeId,
        });
      }
    }
    if (intent.connections?.to) {
      const edgeId = `e-${nodeId}-${intent.connections.to}-${nanoid(4)}`;
      if (
        !nextEdges.some(
          (edge) =>
            edge.source === nodeId && edge.target === intent.connections?.to
        )
      ) {
        nextEdges.push({
          id: edgeId,
          source: nodeId,
          target: intent.connections.to,
        });
      }
    }

    return {
      nodes: state.nodes.concat(newNode),
      edges: nextEdges,
    };
  });
};

const applyDeleteNode = (intent: DeleteNodeIntent) => {
  useWorkflowGeneratorStore.setState((state) => ({
    nodes: state.nodes.filter((node) => node.id !== intent.nodeId),
    edges: state.edges.filter(
      (edge) =>
        edge.source !== intent.nodeId && edge.target !== intent.nodeId
    ),
  }));
};

const applyConnectNodes = (intent: ConnectNodesIntent) => {
  useWorkflowGeneratorStore.setState((state) => {
    const exists = state.edges.some(
      (edge) =>
        edge.source === intent.sourceId && edge.target === intent.targetId
    );
    if (exists) {
      return {};
    }

    const edgeId = `e-${intent.sourceId}-${intent.targetId}-${nanoid(4)}`;
    return {
      edges: state.edges.concat({
        id: edgeId,
        source: intent.sourceId,
        target: intent.targetId,
      }),
    };
  });
};

const applyRepositionNodes = (intent: RepositionNodesIntent) => {
  useWorkflowGeneratorStore.setState((state) => {
    let nodes = state.nodes;

    if (intent.positions?.length) {
      const positionMap = new Map(
        intent.positions.map(({ nodeId, position }) => [nodeId, position])
      );
      nodes = nodes.map((node) =>
        positionMap.has(node.id)
          ? {
              ...node,
              position: positionMap.get(node.id)!,
            }
          : node
      );
    } else if (intent.layout) {
      const spacingX = 220;
      const spacingY = 160;

      if (intent.layout === "horizontal") {
        nodes = nodes.map((node, index) => ({
          ...node,
          position: { x: index * spacingX, y: 0 },
        }));
      } else if (intent.layout === "vertical") {
        nodes = nodes.map((node, index) => ({
          ...node,
          position: { x: 0, y: index * spacingY },
        }));
      } else if (intent.layout === "grid") {
        const cols = Math.ceil(Math.sqrt(nodes.length)) || 1;
        nodes = nodes.map((node, index) => {
          const row = Math.floor(index / cols);
          const col = index % cols;
          return {
            ...node,
            position: { x: col * spacingX, y: row * spacingY },
          };
        });
      }
    }

    return { nodes };
  });
};

const dispatchIntent = (intent: ToolIntent) => {
  switch (intent.type) {
    case "updateNodeLayer":
      return applyUpdateNodeLayer(intent);
    case "addNode":
      return applyAddNode(intent);
    case "deleteNode":
      return applyDeleteNode(intent);
    case "connectNodes":
      return applyConnectNodes(intent);
    case "repositionNodes":
      return applyRepositionNodes(intent);
    default:
      return;
  }
};

export const applyToolResult = (result: ToolResult) => {
  dispatchIntent(result.intent);
};


