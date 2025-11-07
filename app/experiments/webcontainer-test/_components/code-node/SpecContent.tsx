import { WorkflowNodeData } from "../../_state";

export function SpecContent({ data }: { data: WorkflowNodeData }) {
  return (
    <div className="grid gap-4 text-xs text-slate-600 md:grid-cols-3">
      <section>
        <p className="font-semibold uppercase tracking-[0.2em] text-slate-400">
          Input
        </p>
        <ul className="mt-2 space-y-1">
          {data.spec.inputs.length === 0 && <li className="text-slate-400">None</li>}
          {data.spec.inputs.map((input) => (
            <li key={input.name}>
              <span className="font-medium text-slate-700">{input.name}</span>
              <span className="text-slate-400"> · {input.type}</span>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <p className="font-semibold uppercase tracking-[0.2em] text-slate-400">
          Process
        </p>
        <ol className="mt-2 space-y-1">
          {data.spec.process.map((step, index) => (
            <li key={index} className="flex gap-2">
              <span className="text-slate-400">{index + 1}.</span>
              <span className="text-slate-600">{step}</span>
            </li>
          ))}
          {data.spec.process.length === 0 && <li className="text-slate-400">Document the steps.</li>}
        </ol>
      </section>
      <section>
        <p className="font-semibold uppercase tracking-[0.2em] text-slate-400">
          Output
        </p>
        <ul className="mt-2 space-y-1">
          {data.spec.outputs.length === 0 && <li className="text-slate-400">None</li>}
          {data.spec.outputs.map((output) => (
            <li key={output.name}>
              <span className="font-medium text-slate-700">{output.name}</span>
              <span className="text-slate-400"> · {output.type}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
