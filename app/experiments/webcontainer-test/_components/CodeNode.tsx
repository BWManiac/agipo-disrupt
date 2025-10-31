import { useCallback } from "react";
import { Handle, Position } from "@xyflow/react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function CodeNode({ data }) {
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
          <Textarea
            id={`code-${data.id}`}
            defaultValue={data.code}
            onChange={onChange}
            className="nodrag"
            style={{ resize: "vertical" }}
            onPointerDownCapture={(e) => e.stopPropagation()}
          />
        </div>
      </CardContent>
      <Handle type="source" position={Position.Bottom} />
    </Card>
  );
}
