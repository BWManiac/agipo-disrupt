"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export function ControlPanel({
  onAdd,
  onRun,
  onInstall,
  isBooting,
  isInstalling,
  packageName,
  setPackageName,
}) {
  return (
    <div className="absolute z-10 top-4 left-4 bg-background/90 p-4 rounded-lg shadow-lg flex gap-4 items-center">
      <Button onClick={onAdd} disabled={isBooting || isInstalling}>
        Add Node
      </Button>
      <Button onClick={onRun} disabled={isBooting || isInstalling}>
        {isBooting ? "Booting..." : "Run"}
      </Button>
      <Separator orientation="vertical" className="h-6" />
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="npm package"
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
          disabled={isBooting || isInstalling}
          className="w-40"
        />
        <Button
          onClick={onInstall}
          disabled={isBooting || isInstalling || !packageName}
        >
          {isInstalling ? "Installing..." : "Install"}
        </Button>
      </div>
    </div>
  );
}
