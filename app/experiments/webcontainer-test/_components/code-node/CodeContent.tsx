import { Textarea } from "@/components/ui/textarea";
import { WorkflowNodeData } from "../../_state";

export function CodeContent({
  data,
}: {
  data: WorkflowNodeData & { onChange: (id: string, code: string) => void };
}) {
  return (
    <div className="grid w-full gap-1.5">
      <Textarea
        id={`code-${data.id}`}
        defaultValue={data.code}
        onChange={(evt) => data.onChange(data.id, evt.target.value)}
        className="nodrag"
        style={{ resize: "vertical" }}
        onPointerDownCapture={(e) => e.stopPropagation()}
      />
    </div>
  );
}
