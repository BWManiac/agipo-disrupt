"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { ToolDefinition } from "@/_tables/types";

type AgentToolDetail = Pick<ToolDefinition, "id" | "name" | "description" | "runtime">;

export function ToolInspector({
  tool,
  open,
  onOpenChange,
}: {
  tool: AgentToolDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-[480px] sm:w-[540px] overflow-y-auto border-l border-border bg-background"
      >
        {tool ? (
          <div className="space-y-6">
            <SheetHeader>
              <SheetTitle className="text-xl">{tool.name}</SheetTitle>
              <p className="text-sm text-muted-foreground">{tool.description}</p>
            </SheetHeader>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-border bg-background p-3 text-center">
                <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Last called</div>
                <div className="mt-1 font-semibold text-foreground">—</div>
              </div>
              <div className="rounded-lg border border-border bg-background p-3 text-center">
                <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Runtime</div>
                <div className="mt-1 font-semibold text-foreground">{tool.runtime ?? "—"}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="pt-10 text-sm text-muted-foreground">
            Select a tool from the list to view its workflow details.
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

