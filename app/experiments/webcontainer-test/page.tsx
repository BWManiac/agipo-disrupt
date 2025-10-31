"use client";

import "@xyflow/react/dist/style.css";
import { WebContainer } from "@webcontainer/api";

import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  Background,
  Handle,
  Position,
} from "@xyflow/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function CodeNode({ data }) {
  const onChange = useCallback((evt) => {
    data.onChange(data.id, evt.target.value);
  }, []);

  return (
    <div
      style={{
        border: `1px solid ${data.isRunning ? "green" : "#777"}`,
        padding: 10,
        background: "white",
      }}
    >
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Code:</label>
        <textarea
          id="text"
          name="text"
          onChange={onChange}
          className="nodrag"
          defaultValue={data.code}
          style={{ width: "100%", height: 100 }}
        />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

const initialNodes = [
  {
    id: "1",
    type: "code",
    position: { x: 0, y: 0 },
    data: { id: "1", code: 'console.log("Hello");', isRunning: false },
  },
  {
    id: "2",
    type: "code",
    position: { x: 300, y: 0 },
    data: {
      id: "2",
      code: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (line) => console.log(line + " World"));`,
      isRunning: false,
    },
  },
];

let id = 3;
const getNewId = () => `${id++}`;

export default function WebcontainerTestPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const webcontainerInstance = useRef(null);
  const [isBooting, setIsBooting] = useState(true);
  const [output, setOutput] = useState("");

  const nodeTypes = useMemo(() => ({ code: CodeNode }), []);

  useEffect(() => {
    const bootWebContainer = async () => {
      const instance = await WebContainer.boot();
      webcontainerInstance.current = instance;
      setIsBooting(false);
    };
    bootWebContainer();
  }, []);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeCodeChange = useCallback(
    (id, code) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === id) {
            return { ...node, data: { ...node.data, code } };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  const onAdd = useCallback(() => {
    const newId = getNewId();
    const newNode = {
      id: newId,
      type: "code",
      data: { id: newId, code: "// New Node", isRunning: false },
      position: {
        x: Math.random() * window.innerWidth - 100,
        y: Math.random() * window.innerHeight,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  }, [setNodes]);

  const onRun = useCallback(async () => {
    if (!webcontainerInstance.current) return;
    setOutput("");

    // Find all chains of execution
    const sourceNodes = nodes.filter(
      (node) => !edges.some((edge) => edge.target === node.id)
    );

    const executionChains = sourceNodes.map((sourceNode) => {
      const chain = [sourceNode];
      let currentNode = sourceNode;
      while (currentNode) {
        const nextEdge = edges.find((edge) => edge.source === currentNode.id);
        if (nextEdge) {
          const nextNode = nodes.find((node) => node.id === nextEdge.target);
          if (nextNode) {
            chain.push(nextNode);
            currentNode = nextNode;
          } else {
            currentNode = null;
          }
        } else {
          currentNode = null;
        }
      }
      return chain;
    });

    // Execute each chain
    for (const chain of executionChains) {
      // Set isRunning on all nodes in the chain
      setNodes((nds) =>
        nds.map((n) =>
          chain.some((cn) => cn.id === n.id)
            ? { ...n, data: { ...n.data, isRunning: true } }
            : n
        )
      );

      const writeCommands = chain
        .map(
          (node) =>
            `echo '${node.data.code.replace(/'/g, `'\\''`)}' > /tmp/node-${
              node.id
            }.js`
        )
        .join(" && ");

      const executeCommands = chain
        .map((node) => `node /tmp/node-${node.id}.js`)
        .join(" | ");

      const fullCommand = `${writeCommands} && ${executeCommands}`;

      const process = await webcontainerInstance.current.spawn("sh", [
        "-c",
        fullCommand,
      ]);

      process.output.pipeTo(
        new WritableStream({
          write(data) {
            setOutput((prev) => prev + data);
          },
        })
      );

      await process.exit;

      // Unset isRunning on all nodes in the chain
      setNodes((nds) =>
        nds.map((n) =>
          chain.some((cn) => cn.id === n.id)
            ? { ...n, data: { ...n.data, isRunning: false } }
            : n
        )
      );
    }
  }, [nodes, edges, setNodes]);

  const onNodesChangeWithData = (changes) => {
    const nextNodes = nodes.map((node) => {
      const change = changes.find((c) => c.id === node.id && c.type === 'data');
      if (change) {
        return { ...node, data: { ...node.data, ...change.data } };
      }
      return node;
    });
    const finalNodes = onNodesChange(changes);
    // This is a simplified merge, you might need a more robust strategy
    // setNodes(finalNodes);
  };
  
  const augmentedNodes = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        onChange: handleNodeCodeChange,
      },
    }));
  }, [nodes, handleNodeCodeChange]);

  return (
    <div style={{ height: "100vh", width: "100vw", display: "flex" }}>
      <div style={{ flexGrow: 1, position: "relative" }}>
        <button
          onClick={onAdd}
          style={{ position: "absolute", zIndex: 10, left: 10, top: 10 }}
        >
          Add Node
        </button>
        <button
          onClick={onRun}
          disabled={isBooting}
          style={{ position: "absolute", zIndex: 10, left: 10, top: 40 }}
        >
          {isBooting ? "Booting..." : "Run"}
        </button>
        {isBooting && (
          <div style={{ position: "absolute", zIndex: 10, left: 10, top: 40, color: 'white' }}>
            Booting WebContainer...
          </div>
        )}
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
      <div
        style={{
          width: "300px",
          padding: "10px",
          borderLeft: "1px solid #ccc",
          fontFamily: "monospace",
          backgroundColor: "#f7f7f7",
          overflow: "auto",
        }}
      >
        <h2>State</h2>
        <h3>Nodes</h3>
        <pre>{JSON.stringify(nodes, null, 2)}</pre>
        <h3>Edges</h3>
        <pre>{JSON.stringify(edges, null, 2)}</pre>
        <h3>Output</h3>
        <pre style={{ background: "black", color: "white", padding: 10 }}>
          {output}
        </pre>
      </div>
    </div>
  );
}
