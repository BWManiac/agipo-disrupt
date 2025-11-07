import { WorkflowNodeData } from "../../_state";

export function FlowContent({ data }: { data: WorkflowNodeData }) {
  return (
    <div className="space-y-2 text-sm text-slate-600">
      <p className="font-medium text-slate-500">Flow</p>
      <p className="rounded-xl border border-slate-200 bg-slate-50/80 p-3 leading-relaxed">
        {data.flow.summary || "Describe what happens in this step."}
      </p>
    </div>
  );
}
