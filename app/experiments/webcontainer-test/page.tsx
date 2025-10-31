"use client";

import "@xyflow/react/dist/style.css";
import { WebContainer } from "@webcontainer/api";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

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
  const onChange = useCallback(
    (evt) => {
      data.onChange(data.id, evt.target.value);
    },
    [data.id, data.onChange]
  );

  return (
    <Card
      style={{
        width: 350,
        borderWidth: data.isRunning ? "2px" : "1px",
        borderColor: data.isRunning ? "hsl(var(--primary))" : undefined,
      }}
    >
      <Handle type="target" position={Position.Top} />
      <CardHeader>
        <CardTitle>Node {data.id}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full gap-1.5">
          <Label htmlFor={`code-${data.id}`}>Code</Label>
          <ResizablePanelGroup
            direction="vertical"
            className="min-h-[200px] w-full rounded-lg border"
          >
            <ResizablePanel defaultSize={100}>
              <Textarea
                id={`code-${data.id}`}
                defaultValue={data.code}
                onChange={onChange}
                className="h-full w-full resize-none"
              />
            </ResizablePanel>
            <ResizableHandle withHandle />
          </ResizablePanelGroup>
        </div>
      </CardContent>
      <Handle type="source" position={Position.Bottom} />
    </Card>
  );
}

const initialNodes = [
  {
    id: "1",
    type: "code",
    position: { x: 0, y: 0 },
    data: {
      id: "1",
      code: `// This node simply outputs a string to be used by the next node.
process.stdout.write("Data flows like a river!");`,
      isRunning: false,
    },
  },
  {
    id: "2",
    type: "code",
    position: { x: 300, y: 0 },
    data: {
      id: "2",
      code: `const cowsay = require('cowsay');
const readline = require('readline');

// This script reads a single line from standard input...
const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (line) => {
  // ...and uses that line as the text for the cow.
  console.log(cowsay.say({
      text : line,
      e : "oO",
      T : "U "
  }));
});`,
      isRunning: false,
    },
  },
];

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

let id = 3;
const getNewId = () => `${id++}`;

export default function WebcontainerTestPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const webcontainerInstance = useRef(null);
  const [isBooting, setIsBooting] = useState(true);
  const [output, setOutput] = useState("");
  const [packageName, setPackageName] = useState("cowsay");
  const [isInstalling, setIsInstalling] = useState(false);
  const [activeTab, setActiveTab] = useState("console");

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
        <div className="absolute z-10 top-4 left-4 bg-background/90 p-4 rounded-lg shadow-lg flex gap-4 items-center">
          <Button onClick={onAdd} disabled={isBooting || isInstalling}>
            Add Node
          </Button>
          <Button onClick={onRun} disabled={isBooting || isInstalling}>
            {isBooting ? "Booting..." : "Run"}
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="npm package"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              disabled={isBooting || isInstalling}
              className="w-40"
            />
            <Button
              onClick={onInstall}
              disabled={isBooting || isInstalling || !packageName}
            >
              {isInstalling ? "Installing..." : "Install"}
            </Button>
          </div>
        </div>
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
      <div className="w-[400px] border-l bg-background">
        <Tabs defaultValue="console" className="h-full flex flex-col">
          <TabsList className="m-2">
            <TabsTrigger value="console">Console</TabsTrigger>
            <TabsTrigger value="state">State</TabsTrigger>
          </TabsList>
          <TabsContent
            value="console"
            className="flex-grow overflow-auto p-4"
          >
            <h3 className="font-semibold mb-2">Output</h3>
            <pre className="bg-black text-white p-4 rounded-md text-sm whitespace-pre-wrap break-all h-full">
              {output}
            </pre>
          </TabsContent>
          <TabsContent
            value="state"
            className="flex-grow overflow-auto p-4 text-sm"
          >
            <h3 className="font-semibold mb-2">Nodes</h3>
            <pre>{JSON.stringify(nodes, null, 2)}</pre>
            <h3 className="font-semibold mt-4 mb-2">Edges</h3>
            <pre>{JSON.stringify(edges, null, 2)}</pre>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
