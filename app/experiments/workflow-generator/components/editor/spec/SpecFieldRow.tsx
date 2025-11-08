"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
};

export function SpecFieldRow({
  name,
  type,
  description,
  optional,
  onChange,
  onRemove,
}: SpecFieldRowProps) {
  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="space-y-1">
          <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Name
          </Label>
          <input
            value={name}
            onChange={(event) => onChange({ name: event.target.value })}
            placeholder="Field name"
            className="w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Type
          </Label>
          <input
            value={type}
            onChange={(event) => onChange({ type: event.target.value })}
            placeholder="string"
            className="w-full rounded-md border border-slate-200 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-1">
        <Label className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Description
        </Label>
        <Textarea
          value={description ?? ""}
          onChange={(event) => onChange({ description: event.target.value })}
          placeholder="Describe the field"
          rows={2}
        />
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 text-xs text-slate-500">
          <Checkbox
            checked={optional ?? false}
            onCheckedChange={(value) =>
              onChange({ optional: value === true })
            }
          />
          Optional
        </label>
        <button
          type="button"
          onClick={onRemove}
          className="inline-flex items-center gap-1 rounded-md border border-transparent bg-red-100 px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-200"
        >
          <X className="h-3 w-3" />
          Remove
        </button>
      </div>
    </div>
  );
}

