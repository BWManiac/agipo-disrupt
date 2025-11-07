"use client";

import type { WorkflowNodeData } from "../../store/types";

type SpecContentProps = {
  data: WorkflowNodeData;
};

export function SpecContent({ data }: SpecContentProps) {
  return (
    <div className="space-y-4 text-sm text-slate-600">
      <section className="space-y-2">
        <header className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Input
          </p>
          <p className="text-xs text-slate-400">Describe required values.</p>
        </header>
        <ul className="space-y-1 rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          {data.spec.inputs.length === 0 && (
            <li className="text-slate-400">None</li>
          )}
          {data.spec.inputs.map((input) => (
            <li key={input.name} className="flex flex-wrap gap-2">
              <span className="font-medium text-slate-700">{input.name}</span>
              <span className="text-slate-400">· {input.type}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2">
        <header className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Process
          </p>
          <p className="text-xs text-slate-400">
            Explain how this node transforms inputs.
          </p>
        </header>
        <ol className="space-y-1 rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          {data.spec.process.length === 0 && (
            <li className="text-slate-400">Document the steps.</li>
          )}
          {data.spec.process.map((step, index) => (
            <li key={index} className="flex gap-2">
              <span className="text-slate-400">{index + 1}.</span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="space-y-2">
        <header className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Output
          </p>
          <p className="text-xs text-slate-400">List what will be emitted.</p>
        </header>
        <ul className="space-y-1 rounded-xl border border-slate-200 bg-slate-50/70 p-3">
          {data.spec.outputs.length === 0 && (
            <li className="text-slate-400">None</li>
          )}
          {data.spec.outputs.map((output) => (
            <li key={output.name} className="flex flex-wrap gap-2">
              <span className="font-medium text-slate-700">
                {output.name}
              </span>
              <span className="text-slate-400">· {output.type}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

