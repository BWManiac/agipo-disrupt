"use client";

import { Handle, Position } from "@xyflow/react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import type { ContractField, WorkflowNodeData } from "../store/types";
import { CodeContent } from "./code-node/CodeContent";
import { FlowContent } from "./code-node/FlowContent";
import { SpecContent } from "./code-node/SpecContent";

type CodeNodeData = WorkflowNodeData & {
  onChange: (id: string, code: string) => void;
  onFlowChange: (id: string, summary: string) => void;
  onTitleChange: (id: string, title: string) => void;
  onSpecInputAdd: (id: string) => void;
  onSpecInputChange: (
    id: string,
    index: number,
    patch: Partial<ContractField>
  ) => void;
  onSpecInputRemove: (id: string, index: number) => void;
  onSpecOutputAdd: (id: string) => void;
  onSpecOutputChange: (
    id: string,
    index: number,
    patch: Partial<ContractField>
  ) => void;
  onSpecOutputRemove: (id: string, index: number) => void;
  onProcessStepAdd: (id: string) => void;
  onProcessStepChange: (id: string, index: number, value: string) => void;
  onProcessStepRemove: (id: string, index: number) => void;
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
        <CardTitle>
          <EditableTitle
            title={data.title || `Node ${data.id}`}
            onChange={(title) => data.onTitleChange(data.id, title)}
          />
        </CardTitle>
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
        {data.activeLayer === "spec" && (
          <SpecContent
            data={data}
            onInputAdd={() => data.onSpecInputAdd(data.id)}
            onInputChange={(index, patch) =>
              data.onSpecInputChange(data.id, index, patch)
            }
            onInputRemove={(index) => data.onSpecInputRemove(data.id, index)}
            onOutputAdd={() => data.onSpecOutputAdd(data.id)}
            onOutputChange={(index, patch) =>
              data.onSpecOutputChange(data.id, index, patch)
            }
            onOutputRemove={(index) => data.onSpecOutputRemove(data.id, index)}
            onProcessAdd={() => data.onProcessStepAdd(data.id)}
            onProcessChange={(index, value) =>
              data.onProcessStepChange(data.id, index, value)
            }
            onProcessRemove={(index) =>
              data.onProcessStepRemove(data.id, index)
            }
          />
        )}
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

function EditableTitle({
  title,
  onChange,
}: {
  title: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      value={title}
      onChange={(event) => onChange(event.target.value)}
      onBlur={(event) => onChange(event.target.value.trim() || title)}
      className="w-full border-none bg-transparent text-left text-lg font-semibold focus:outline-none focus:ring-0"
      onPointerDownCapture={(event) => event.stopPropagation()}
    />
  );
}

