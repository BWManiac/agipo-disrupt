import { Textarea } from "@/components/ui/textarea";
import { WorkflowNodeData } from "../../_state";

export function FlowContent({
  data,
}: {
  data: WorkflowNodeData & { onFlowChange: (id: string, summary: string) => void };
}) {
  return (
    <div className="space-y-2 text-sm text-slate-600">
      <p className="font-medium text-slate-500">Flow</p>
      <Textarea
        value={data.flow.summary}
        onChange={(evt) => data.onFlowChange(data.id, evt.target.value)}
        placeholder="Describe what happens in this step."
        className="min-h-[120px] resize-y"
      />
    </div>
  );
}
