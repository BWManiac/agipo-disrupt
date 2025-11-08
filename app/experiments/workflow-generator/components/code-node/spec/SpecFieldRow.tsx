"use client";

import { X } from "lucide-react";

type SpecFieldRowProps = {
  name: string;
  type: string;
  description?: string;
  optional?: boolean;
  onChange: (patch: {
    name?: string;
    type?: string;
    description?: string;
    optional?: boolean;
  }) => void;
  onRemove: () => void;
  label: string;
};

export function SpecFieldRow({
  name,
  type,
  description,
  optional,
  onChange,
  onRemove,
  label,
}: SpecFieldRowProps) {
  return (
    <div className="grid grid-cols-[1fr_1fr] gap-2 rounded-xl border border-slate-200 bg-slate-50/60 p-3">
      <div className="space-y-1">
        <label className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
          {label}
        </label>
        <input
          value={name}
          onChange={(event) => onChange({ name: event.target.value })}
          placeholder="Name"
          className="w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onPointerDownCapture={(event) => event.stopPropagation()}
        />
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
          Type
        </label>
        <input
          value={type}
          onChange={(event) => onChange({ type: event.target.value })}
          placeholder="string"
          className="w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onPointerDownCapture={(event) => event.stopPropagation()}
        />
      </div>
      <div className="col-span-2 space-y-1">
        <label className="text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
          Description
        </label>
        <textarea
          value={description ?? ""}
          onChange={(event) => onChange({ description: event.target.value })}
          placeholder="Describe the field"
          className="w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={2}
          onPointerDownCapture={(event) => event.stopPropagation()}
        />
      </div>
      <div className="col-span-2 flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs text-slate-500">
          <input
            type="checkbox"
            checked={optional ?? false}
            onChange={(event) => onChange({ optional: event.target.checked })}
            onPointerDownCapture={(event) => event.stopPropagation()}
          />
          Optional
        </label>
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center gap-1 rounded-md border border-transparent bg-red-100 px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-200"
          onPointerDownCapture={(event) => event.stopPropagation()}
        >
          <X className="h-3 w-3" />
          Remove
        </button>
      </div>
    </div>
  );
}

