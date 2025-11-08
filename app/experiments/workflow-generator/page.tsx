"use client";

/**
 * WorkflowGeneratorPage
 * ---------------------
 * Coordinates the React Flow canvas, sidebar tabs, webcontainer runtime, and
 * edge-mapping UX.  The component mostly wires Zustand slices to presentation
 * components—heavy lifting stays inside the store so we can test it in isolation.
 */
import "@xyflow/react/dist/style.css";

import { useEffect, useMemo, useCallback } from "react";
import {
  Background,
  Controls,
  ReactFlow,
  type EdgeMouseHandler,
} from "@xyflow/react";

import { ControlPanel } from "./components/ControlPanel";
import { CodeNode } from "./components/CodeNode";
import { Sidebar } from "./components/Sidebar";
import { ChatPanel } from "./components/ChatPanel";
import { useWorkflowGeneratorStore } from "./store";
import type { MatchResult, EdgeFieldRef } from "./types/domain";

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
  const activeEdgeId = useWorkflowGeneratorStore(
    (state) => state.activeEdgeId
  );
  const mappings = useWorkflowGeneratorStore((state) => state.mappings);
  const setActiveEdge = useWorkflowGeneratorStore(
    (state) => state.setActiveEdge
  );
  const linkFields = useWorkflowGeneratorStore((state) => state.linkFields);
  const unlinkField = useWorkflowGeneratorStore((state) => state.unlinkField);
  const setStaticValue = useWorkflowGeneratorStore(
    (state) => state.setStaticValue
  );
  const bootRuntime = useWorkflowGeneratorStore((state) => state.bootRuntime);
  const teardownRuntime = useWorkflowGeneratorStore(
    (state) => state.teardownRuntime
  );

  useEffect(() => {
    // Bootstrap the webcontainer on mount; tear it down when navigating away.
    bootRuntime();
    return () => {
      teardownRuntime();
    };
  }, [bootRuntime, teardownRuntime]);

  const nodeTypes = useMemo(() => ({ code: CodeNode }), []);

  const handleOpenEditor = useCallback(
    (nodeId: string) => {
      // Switching focus to a node should deactivate any active edge editor.
      setActiveEdge(null);
      openEditor(nodeId);
      setSidebarTab("editor");
    },
    [openEditor, setActiveEdge, setSidebarTab]
  );

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
          onOpenEditor: handleOpenEditor,
          activeLayer,
        },
      })),
    [
      nodes,
      updateNodeCode,
      updateNodeFlowSummary,
      updateNodeTitle,
      handleOpenEditor,
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

  const activeEdge = useMemo(
    () => edges.find((edge) => edge.id === activeEdgeId) ?? null,
    [edges, activeEdgeId]
  );

  const edgeSourceNode = useMemo(
    () =>
      activeEdge ? nodes.find((node) => node.id === activeEdge.source) ?? null : null,
    [activeEdge, nodes]
  );

  const edgeTargetNode = useMemo(
    () =>
      activeEdge ? nodes.find((node) => node.id === activeEdge.target) ?? null : null,
    [activeEdge, nodes]
  );

  const edgeMapping = activeEdgeId ? mappings[activeEdgeId] : undefined;

  const handleEdgeClick: EdgeMouseHandler = useCallback(
    (_event, edge) => {
      setSidebarTab("editor");
      setActiveEdge(edge.id);
    },
    [setActiveEdge, setSidebarTab]
  );

  const handleLinkEdge = useCallback(
    (from: EdgeFieldRef | undefined, to: EdgeFieldRef) => {
      if (!activeEdgeId) {
        return {
          status: "warning",
          reason: "missing-downstream",
        } as MatchResult;
      }
      return linkFields(activeEdgeId, from, to);
    },
    [activeEdgeId, linkFields]
  );

  const handleUnlinkEdge = useCallback(
    (to: EdgeFieldRef) => {
      if (!activeEdgeId) return;
      unlinkField(activeEdgeId, to);
    },
    [activeEdgeId, unlinkField]
  );

  const handleStaticValue = useCallback(
    (to: EdgeFieldRef, value: string) => {
      if (!activeEdgeId) return;
      setStaticValue(activeEdgeId, to, value);
    },
    [activeEdgeId, setStaticValue]
  );

  const handleCanvasClick = useCallback(() => {
    // Clicking empty canvas space should clear the edge selection.
    setActiveEdge(null);
  }, [setActiveEdge]);

  return (
    // Layout: chat docked left, canvas centre, sidebar right.
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
          onEdgeClick={handleEdgeClick}
          onPaneClick={handleCanvasClick}
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
        activeEdgeId={activeEdgeId}
        edgeSourceNode={edgeSourceNode}
        edgeTargetNode={edgeTargetNode}
        edgeMapping={edgeMapping}
        onLinkEdge={handleLinkEdge}
        onUnlinkEdge={handleUnlinkEdge}
        onSetStaticValue={handleStaticValue}
      />
    </div>
  );
}

