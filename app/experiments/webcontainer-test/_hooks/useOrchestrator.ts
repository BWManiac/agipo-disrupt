import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNodesState, useEdgesState, addEdge } from "@xyflow/react";
import { WebContainer } from "@webcontainer/api";
import { initialNodes, initialEdges } from "../_state";

let id = 3;
const getNewId = () => `${id++}`;

export function useOrchestrator() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const webcontainerInstance = useRef(null);
  const [isBooting, setIsBooting] = useState(true);
  const [output, setOutput] = useState("");
  const [packageName, setPackageName] = useState("cowsay");
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    const bootWebContainer = async () => {
      const instance = await WebContainer.boot();
      webcontainerInstance.current = instance;
      setIsBooting(false);
    };

    bootWebContainer();

    return () => {
      if (webcontainerInstance.current) {
        webcontainerInstance.current.teardown();
      }
    };
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

  const onInstall = useCallback(async () => {
    if (!webcontainerInstance.current || !packageName) return;

    setIsInstalling(true);
    setOutput(`Installing ${packageName}...\n`);

    const command = `cd /tmp && npm install ${packageName}`;
    const process = await webcontainerInstance.current.spawn("sh", [
      "-c",
      command,
    ]);

    process.output.pipeTo(
      new WritableStream({
        write(data) {
          setOutput((prev) => prev + data);
        },
      })
    );

    await process.exit;
    setIsInstalling(false);
  }, [packageName]);

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

      const fullCommand = `cd /tmp && ${writeCommands} && ${executeCommands}`;

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

  const augmentedNodes = useMemo(() => {
    return nodes.map((node) => ({
      ...node,
      data: {
        ...node.data,
        onChange: handleNodeCodeChange,
      },
    }));
  }, [nodes, handleNodeCodeChange]);

  return {
    nodes,
    edges,
    output,
    packageName,
    isBooting,
    isInstalling,
    augmentedNodes,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onAdd,
    onRun,
    onInstall,
    setPackageName,
  };
}
