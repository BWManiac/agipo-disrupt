"use client";

import { X } from "lucide-react";

type ProcessStepItemProps = {
  index: number;
  value: string;
  onChange: (value: string) => void;
  onRemove: () => void;
};

export function ProcessStepItem({
  index,
  value,
  onChange,
  onRemove,
}: ProcessStepItemProps) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 p-3">
      <span className="mt-1 text-xs font-semibold text-slate-500">
        {index + 1}.
      </span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Describe the transformation step."
        className="flex-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={2}
        onPointerDownCapture={(event) => event.stopPropagation()}
      />
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
  );
}

