"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import type { WorkflowLayer } from "../store/types";

type ControlPanelProps = {
  onAdd: () => void;
  onRun: () => void;
  onInstall: () => void;
  isBooting: boolean;
  isInstalling: boolean;
  packageName: string;
  setPackageName: (pkg: string) => void;
  activeLayer: WorkflowLayer;
  onLayerChange: (layer: WorkflowLayer) => void;
};

export function ControlPanel({
  onAdd,
  onRun,
  onInstall,
  isBooting,
  isInstalling,
  packageName,
  setPackageName,
  activeLayer,
  onLayerChange,
}: ControlPanelProps) {
  return (
    <div className="pointer-events-none absolute top-4 left-1/2 z-10 flex w-full max-w-4xl -translate-x-1/2 items-center justify-between rounded-2xl border border-slate-200 bg-background/90 px-6 py-4 shadow-lg backdrop-blur">
      {/* Re-enable pointer events on interactive children */}
      <Button
        onClick={onAdd}
        disabled={isBooting || isInstalling}
        className="pointer-events-auto"
      >
        Add Node
      </Button>
      <Button
        onClick={onRun}
        disabled={isBooting || isInstalling}
        className="pointer-events-auto"
      >
        {isBooting ? "Booting..." : "Run"}
      </Button>
      <Separator orientation="vertical" className="h-6" />
      <div className="pointer-events-auto flex gap-2">
        <Input
          type="text"
          placeholder="npm package"
          value={packageName}
          onChange={(event) => setPackageName(event.target.value)}
          disabled={isBooting || isInstalling}
          className="w-40"
        />
        <Button
          onClick={onInstall}
          disabled={isBooting || isInstalling || !packageName}
          className="pointer-events-auto"
        >
          {isInstalling ? "Installing..." : "Install"}
        </Button>
      </div>
      <Separator orientation="vertical" className="h-6" />
      <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-slate-200 bg-white p-1">
        {(["flow", "spec", "code"] as WorkflowLayer[]).map((layer) => {
          const isActive = activeLayer === layer;
          return (
            <button
              key={layer}
              type="button"
              onClick={() => onLayerChange(layer)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                isActive
                  ? "bg-blue-600 text-white shadow"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              {layer.charAt(0).toUpperCase() + layer.slice(1)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

