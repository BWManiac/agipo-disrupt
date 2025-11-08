import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addEdge,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import type {
  Connection,
  NodeChange,
  OnNodesChange,
} from "@xyflow/react";

import {
  ensureRuntimeReady,
  installDependency,
  runWorkflow,
  teardownRuntime,
} from "../_services/workflowExecutionService";
import { initialWorkflow } from "../_state/initialWorkflow";
import { createWorkflow } from "../_domain/workflow";
import type { WorkflowNode } from "../_domain/workflow";
import { markChainRunning, appendOutput } from "../_application/orchestratorState";
import {
  toAugmentedNodes,
  toContracts,
} from "../_presenters/flowAdapters";
import type { AugmentedWorkflowNode } from "../_presenters/flowAdapters";

let id = 3;
const getNewId = () => `${id++}`;

type WorkflowLayer = "flow" | "spec" | "code";

export function useOrchestrator() {
  const [nodes, setNodes, onNodesChangeInternal] = useNodesState<WorkflowNode>(
    initialWorkflow.nodes
  );
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialWorkflow.edges);
  const [isBooting, setIsBooting] = useState(true);
  const [output, setOutput] = useState("");
  const [packageName, setPackageName] = useState("cowsay");
  const [isInstalling, setIsInstalling] = useState(false);
  const [activeLayer, setActiveLayer] = useState<WorkflowLayer>("flow");

  useEffect(() => {
    let isMounted = true;

    const bootRuntime = async () => {
      try {
        await ensureRuntimeReady();
      } finally {
        if (isMounted) {
          setIsBooting(false);
        }
      }
    };

    bootRuntime();

    return () => {
      isMounted = false;
      teardownRuntime();
    };
  }, []);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodesChange = useCallback<OnNodesChange<AugmentedWorkflowNode>>(
    (changes) =>
      onNodesChangeInternal(changes as NodeChange<WorkflowNode>[]),
    [onNodesChangeInternal]
  );

  const handleNodeCodeChange = useCallback(
    (nodeId: string, code: string) => {
      setNodes((currentNodes) =>
        currentNodes.map((node) =>
          node.id === nodeId ? { ...node, data: { ...node.data, code } } : node
        )
      );
    },
    [setNodes]
  );

  const handleFlowChange = useCallback(
    (nodeId: string, summary: string) => {
      setNodes((currentNodes) =>
        currentNodes.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                data: {
                  ...node.data,
                  flow: {
                    ...node.data.flow,
                    summary,
                  },
                },
              }
            : node
        )
      );
    },
    [setNodes]
  );

  const onAdd = useCallback(() => {
    const newId = getNewId();
    const newNode: WorkflowNode = {
      id: newId,
      type: "code",
      data: {
        id: newId,
        title: `Node ${newId}`,
        code: "// New Node",
        isRunning: false,
        flow: {
          summary: "Describe this step to help teammates understand the flow.",
        },
        spec: {
          inputs: [],
          process: ["Document the transformation logic here."],
          outputs: [],
        },
      },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((currentNodes) => currentNodes.concat(newNode));
  }, [setNodes]);

  const onInstall = useCallback(async () => {
    if (!packageName) {
      return;
    }

    setIsInstalling(true);
    setOutput(`Installing ${packageName}...\n`);

    try {
      await installDependency(packageName, (chunk) =>
        appendOutput(setOutput, chunk)
    );
    } finally {
    setIsInstalling(false);
    }
  }, [packageName]);

  const onRun = useCallback(async () => {
    setOutput("");

    const workflow = createWorkflow(nodes, edges);

    await runWorkflow(workflow, (chunk) => appendOutput(setOutput, chunk), {
      onChainStart: (chain) => markChainRunning(setNodes, chain, true),
      onChainComplete: (chain) => markChainRunning(setNodes, chain, false),
    });
  }, [nodes, edges, setNodes]);

  const augmentedNodes = useMemo(
    () =>
      toAugmentedNodes(nodes, {
        onCodeChange: handleNodeCodeChange,
        onFlowChange: handleFlowChange,
        activeLayer,
      }),
    [nodes, handleNodeCodeChange, handleFlowChange, activeLayer]
  );

  const contracts = useMemo(() => toContracts(nodes), [nodes]);

  return {
    nodes,
    edges,
    output,
    packageName,
    isBooting,
    isInstalling,
    activeLayer,
    contracts,
    augmentedNodes,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onAdd,
    onRun,
    onInstall,
    setPackageName,
    setActiveLayer,
  };
}
