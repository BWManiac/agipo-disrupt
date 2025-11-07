import { Handle, Position } from "@xyflow/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import { WorkflowNodeData } from "../_state";
import { FlowContent } from "./code-node/FlowContent";
import { SpecContent } from "./code-node/SpecContent";
import { CodeContent } from "./code-node/CodeContent";

type CodeNodeData = WorkflowNodeData & {
  onChange: (id: string, code: string) => void;
  activeLayer: "flow" | "spec" | "code";
};

export function CodeNode({ data }: { data: CodeNodeData }) {
  return (
    <Card
      style={{
        width: 360,
        borderWidth: data.isRunning ? "2px" : "1px",
        borderColor: data.isRunning ? "hsl(var(--primary))" : undefined,
      }}
    >
      <Handle type="target" position={Position.Top} />
      <CardHeader>
        <CardTitle>{data.title || `Node ${data.id}`}</CardTitle>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {data.activeLayer === "flow"
            ? "Flow"
            : data.activeLayer === "spec"
            ? "Spec"
            : "Code"}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {data.activeLayer === "flow" && <FlowContent data={data} />}
        {data.activeLayer === "spec" && <SpecContent data={data} />}
        {data.activeLayer === "code" && (
          <div className="space-y-1">
            <Label htmlFor={`code-${data.id}`}>Code</Label>
            <CodeContent data={data} />
          </div>
        )}
      </CardContent>
      <Handle type="source" position={Position.Bottom} />
    </Card>
  );
}
