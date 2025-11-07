"use client";

import "@xyflow/react/dist/style.css";

import { useMemo } from "react";
import { ReactFlow, Controls, Background } from "@xyflow/react";

import { useOrchestrator } from "./_hooks/useOrchestrator";
import { CodeNode } from "./_components/CodeNode";
import { ControlPanel } from "./_components/ControlPanel";
import { Sidebar } from "./_components/Sidebar";

export default function WebcontainerTestPage() {
  const {
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
  } = useOrchestrator();

  const nodeTypes = useMemo(() => ({ code: CodeNode }), []);

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex" }}>
      <div style={{ flexGrow: 1, position: "relative" }}>
        <ControlPanel
          onAdd={onAdd}
          onRun={onRun}
          onInstall={onInstall}
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
