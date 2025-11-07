"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Edge } from "@xyflow/react";

import type { WorkflowLayer, WorkflowNode } from "../store/types";

type SidebarProps = {
  nodes: WorkflowNode[];
  edges: Edge[];
  output: string;
  activeLayer: WorkflowLayer;
  contracts: {
    id: string;
    title: string;
    flow: WorkflowNode["data"]["flow"];
    spec: WorkflowNode["data"]["spec"];
  }[];
};

export function Sidebar({
  nodes,
  edges,
  output,
  activeLayer,
  contracts,
}: SidebarProps) {
  return (
    <div className="w-[400px] border-l bg-background">
      <Tabs defaultValue="console" className="flex h-full flex-col">
        <TabsList className="m-2">
          <TabsTrigger value="console">Console</TabsTrigger>
          <TabsTrigger value="state">State</TabsTrigger>
          <TabsTrigger value="context">Context</TabsTrigger>
        </TabsList>
        <TabsContent value="console" className="flex-grow overflow-auto p-4">
          <h3 className="mb-2 font-semibold">Output</h3>
          <pre className="h-full rounded-md bg-black p-4 text-sm text-white">
            {output}
          </pre>
        </TabsContent>
        <TabsContent
          value="state"
          className="flex-grow overflow-auto p-4 text-sm"
        >
          <h3 className="mb-2 font-semibold">Nodes</h3>
          <pre>{JSON.stringify(nodes, null, 2)}</pre>
          <h3 className="mt-4 mb-2 font-semibold">Edges</h3>
          <pre>{JSON.stringify(edges, null, 2)}</pre>
        </TabsContent>
        <TabsContent
          value="context"
          className="flex-grow overflow-auto p-4 text-sm"
        >
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
              Active Layer
            </p>
            <p className="mt-1 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
              {activeLayer.charAt(0).toUpperCase() + activeLayer.slice(1)}
            </p>
          </div>
          <div className="space-y-4">
            {contracts.map((contract) => (
              <div
                key={contract.id}
                className="rounded-2xl border border-slate-200 bg-white p-3"
              >
                <p className="text-sm font-semibold text-slate-900">
                  {contract.title}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {activeLayer === "flow"
                    ? contract.flow.summary
                    : activeLayer === "spec"
                    ? `${contract.spec.inputs.length} inputs • ${contract.spec.outputs.length} outputs`
                    : "Editable code node."}
                </p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

