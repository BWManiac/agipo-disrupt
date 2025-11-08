"use client";

import "@xyflow/react/dist/style.css";

import { useEffect, useMemo } from "react";
import { Background, Controls, ReactFlow } from "@xyflow/react";

import { ControlPanel } from "./components/ControlPanel";
import { CodeNode } from "./components/CodeNode";
import { Sidebar } from "./components/Sidebar";
import { ChatPanel } from "./components/ChatPanel";
import { useWorkflowGeneratorStore } from "./store";

export default function WorkflowGeneratorPage() {
  const nodes = useWorkflowGeneratorStore((state) => state.nodes);
  const edges = useWorkflowGeneratorStore((state) => state.edges);
  const output = useWorkflowGeneratorStore((state) => state.output);
  const packageName = useWorkflowGeneratorStore((state) => state.packageName);
  const isBooting = useWorkflowGeneratorStore((state) => state.isBooting);
  const isInstalling = useWorkflowGeneratorStore((state) => state.isInstalling);
  const activeLayer = useWorkflowGeneratorStore((state) => state.activeLayer);
  const activeSidebarTab = useWorkflowGeneratorStore(
    (state) => state.activeSidebarTab
  );

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
  const setSidebarTab = useWorkflowGeneratorStore(
    (state) => state.setSidebarTab
  );
  const openEditor = useWorkflowGeneratorStore((state) => state.openEditor);
  const editingNodeId = useWorkflowGeneratorStore(
    (state) => state.editingNodeId
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
        selected: node.id === editingNodeId,
        data: {
          ...node.data,
          onChange: updateNodeCode,
          onFlowChange: updateNodeFlowSummary,
          onTitleChange: updateNodeTitle,
          onOpenEditor: openEditor,
          activeLayer,
        },
      })),
    [
      nodes,
      updateNodeCode,
      updateNodeFlowSummary,
      updateNodeTitle,
      openEditor,
      editingNodeId,
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

  const editingNode = useMemo(
    () => nodes.find((node) => node.id === editingNodeId) ?? null,
    [nodes, editingNodeId]
  );

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex" }}>
      <ChatPanel />
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
        activeTab={activeSidebarTab}
        onTabChange={setSidebarTab}
        editingNode={editingNode}
      />
    </div>
  );
}

