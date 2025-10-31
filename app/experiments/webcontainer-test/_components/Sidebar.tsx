"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function Sidebar({ nodes, edges, output }) {
  return (
    <div className="w-[400px] border-l bg-background">
      <Tabs defaultValue="console" className="h-full flex flex-col">
        <TabsList className="m-2">
          <TabsTrigger value="console">Console</TabsTrigger>
          <TabsTrigger value="state">State</TabsTrigger>
        </TabsList>
        <TabsContent value="console" className="flex-grow overflow-auto p-4">
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
  );
}
