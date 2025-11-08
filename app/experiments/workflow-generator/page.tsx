"use client";

import "@xyflow/react/dist/style.css";

import { useEffect, useMemo } from "react";
import { Background, Controls, ReactFlow } from "@xyflow/react";

import { ControlPanel } from "./components/ControlPanel";
import { CodeNode } from "./components/CodeNode";
import { Sidebar } from "./components/Sidebar";
import { useWorkflowGeneratorStore } from "./store";

export default function WorkflowGeneratorPage() {
  const nodes = useWorkflowGeneratorStore((state) => state.nodes);
  const edges = useWorkflowGeneratorStore((state) => state.edges);
  const output = useWorkflowGeneratorStore((state) => state.output);
  const packageName = useWorkflowGeneratorStore((state) => state.packageName);
  const isBooting = useWorkflowGeneratorStore((state) => state.isBooting);
  const isInstalling = useWorkflowGeneratorStore((state) => state.isInstalling);
  const activeLayer = useWorkflowGeneratorStore((state) => state.activeLayer);

  const onNodesChange = useWorkflowGeneratorStore((state) => state.onNodesChange);
  const onEdgesChange = useWorkflowGeneratorStore((state) => state.onEdgesChange);
  const onConnect = useWorkflowGeneratorStore((state) => state.onConnect);
  const addNode = useWorkflowGeneratorStore((state) => state.addNode);
  const updateNodeCode = useWorkflowGeneratorStore(
    (state) => state.updateNodeCode
  );
  const updateNodeFlowSummary = useWorkflowGeneratorStore(
    (state) => state.updateNodeFlowSummary
  );
  const updateNodeTitle = useWorkflowGeneratorStore(
    (state) => state.updateNodeTitle
  );
  const addNodeSpecInput = useWorkflowGeneratorStore(
    (state) => state.addNodeSpecInput
  );
  const updateNodeSpecInput = useWorkflowGeneratorStore(
    (state) => state.updateNodeSpecInput
  );
  const removeNodeSpecInput = useWorkflowGeneratorStore(
    (state) => state.removeNodeSpecInput
  );
  const addNodeSpecOutput = useWorkflowGeneratorStore(
    (state) => state.addNodeSpecOutput
  );
  const updateNodeSpecOutput = useWorkflowGeneratorStore(
    (state) => state.updateNodeSpecOutput
  );
  const removeNodeSpecOutput = useWorkflowGeneratorStore(
    (state) => state.removeNodeSpecOutput
  );
  const addNodeProcessStep = useWorkflowGeneratorStore(
    (state) => state.addNodeProcessStep
  );
  const updateNodeProcessStep = useWorkflowGeneratorStore(
    (state) => state.updateNodeProcessStep
  );
  const removeNodeProcessStep = useWorkflowGeneratorStore(
    (state) => state.removeNodeProcessStep
  );

  const installDependency = useWorkflowGeneratorStore(
    (state) => state.installDependency
  );
  const runWorkflow = useWorkflowGeneratorStore((state) => state.runWorkflow);
  const setPackageName = useWorkflowGeneratorStore(
    (state) => state.setPackageName
  );
  const setActiveLayer = useWorkflowGeneratorStore(
    (state) => state.setActiveLayer
  );
  const bootRuntime = useWorkflowGeneratorStore((state) => state.bootRuntime);
  const teardownRuntime = useWorkflowGeneratorStore(
    (state) => state.teardownRuntime
  );

  useEffect(() => {
    bootRuntime();
    return () => {
      teardownRuntime();
    };
  }, [bootRuntime, teardownRuntime]);

  const nodeTypes = useMemo(() => ({ code: CodeNode }), []);

  const augmentedNodes = useMemo(
    () =>
      nodes.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onChange: updateNodeCode,
          onFlowChange: updateNodeFlowSummary,
          onTitleChange: updateNodeTitle,
          onSpecInputAdd: addNodeSpecInput,
          onSpecInputChange: updateNodeSpecInput,
          onSpecInputRemove: removeNodeSpecInput,
          onSpecOutputAdd: addNodeSpecOutput,
          onSpecOutputChange: updateNodeSpecOutput,
          onSpecOutputRemove: removeNodeSpecOutput,
          onProcessStepAdd: addNodeProcessStep,
          onProcessStepChange: updateNodeProcessStep,
          onProcessStepRemove: removeNodeProcessStep,
          activeLayer,
        },
      })),
    [
      nodes,
      updateNodeCode,
      updateNodeFlowSummary,
      updateNodeTitle,
      addNodeSpecInput,
      updateNodeSpecInput,
      removeNodeSpecInput,
      addNodeSpecOutput,
      updateNodeSpecOutput,
      removeNodeSpecOutput,
      addNodeProcessStep,
      updateNodeProcessStep,
      removeNodeProcessStep,
      activeLayer,
    ]
  );

  const contracts = useMemo(
    () =>
      nodes.map((node) => ({
        id: node.id,
        title: node.data.title,
        flow: node.data.flow,
        spec: node.data.spec,
      })),
    [nodes]
  );

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex" }}>
      <div style={{ flexGrow: 1, position: "relative" }}>
        <ControlPanel
          onAdd={addNode}
          onRun={runWorkflow}
          onInstall={installDependency}
          isBooting={isBooting}
          isInstalling={isInstalling}
          packageName={packageName}
          setPackageName={setPackageName}
          activeLayer={activeLayer}
          onLayerChange={setActiveLayer}
        />
        <ReactFlow
          nodes={augmentedNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
        >
          <Controls />
          <Background />
        </ReactFlow>
      </div>
      <Sidebar
        nodes={nodes}
        edges={edges}
        output={output}
        activeLayer={activeLayer}
        contracts={contracts}
      />
    </div>
  );
}

