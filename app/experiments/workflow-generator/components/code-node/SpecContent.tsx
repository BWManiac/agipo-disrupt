"use client";

import { Plus } from "lucide-react";

import type { ContractField, WorkflowNodeData } from "../../store/types";
import { ProcessStepItem } from "./spec/ProcessStepItem";
import { SectionHeader } from "./spec/SectionHeader";
import { SpecFieldRow } from "./spec/SpecFieldRow";

type SpecContentProps = {
  data: WorkflowNodeData;
  onInputAdd: () => void;
  onInputChange: (index: number, patch: Partial<ContractField>) => void;
  onInputRemove: (index: number) => void;
  onOutputAdd: () => void;
  onOutputChange: (index: number, patch: Partial<ContractField>) => void;
  onOutputRemove: (index: number) => void;
  onProcessAdd: () => void;
  onProcessChange: (index: number, value: string) => void;
  onProcessRemove: (index: number) => void;
};

export function SpecContent({
  data,
  onInputAdd,
  onInputChange,
  onInputRemove,
  onOutputAdd,
  onOutputChange,
  onOutputRemove,
  onProcessAdd,
  onProcessChange,
  onProcessRemove,
}: SpecContentProps) {
  return (
    <div className="space-y-5 text-sm text-slate-600">
      <section className="space-y-3">
        <SectionHeader
          title="Input"
          subtitle="Describe required values."
        />
        <div className="space-y-3">
          {data.spec.inputs.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-3 text-xs text-slate-400">
              No inputs defined yet.
            </p>
          ) : (
            data.spec.inputs.map((input, index) => (
              <SpecFieldRow
                key={index}
                label={`Field ${index + 1}`}
                name={input.name}
                type={input.type}
                description={input.description}
                optional={input.optional}
                onChange={(patch) => onInputChange(index, patch)}
                onRemove={() => onInputRemove(index)}
              />
            ))
          )}
          <AddButton label="Add input" onClick={onInputAdd} />
        </div>
      </section>

      <section className="space-y-3">
        <SectionHeader
          title="Process"
          subtitle="Explain how this node transforms inputs."
        />
        <div className="space-y-3">
          {data.spec.process.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-3 text-xs text-slate-400">
              Document the steps.
            </p>
          ) : (
            data.spec.process.map((step, index) => (
              <ProcessStepItem
                key={index}
                index={index}
                value={step}
                onChange={(value) => onProcessChange(index, value)}
                onRemove={() => onProcessRemove(index)}
              />
            ))
          )}
          <AddButton label="Add step" onClick={onProcessAdd} />
        </div>
      </section>

      <section className="space-y-3">
        <SectionHeader
          title="Output"
          subtitle="List what will be emitted."
        />
        <div className="space-y-3">
          {data.spec.outputs.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-3 text-xs text-slate-400">
              No outputs defined yet.
            </p>
          ) : (
            data.spec.outputs.map((output, index) => (
              <SpecFieldRow
                key={index}
                label={`Field ${index + 1}`}
                name={output.name}
                type={output.type}
                description={output.description}
                optional={output.optional}
                onChange={(patch) => onOutputChange(index, patch)}
                onRemove={() => onOutputRemove(index)}
              />
            ))
          )}
          <AddButton label="Add output" onClick={onOutputAdd} />
        </div>
      </section>
    </div>
  );
}

function AddButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-100"
      onPointerDownCapture={(event) => event.stopPropagation()}
    >
      <Plus className="h-4 w-4" />
      {label}
    </button>
  );
}

