"use client";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import type { AgentToolUsage } from "../data/mock-data";

export function ToolInspector({
  tool,
  open,
  onOpenChange,
}: {
  tool: AgentToolUsage | null;
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

            {tool.domains?.length ? (
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Data domains
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tool.domains.map((domain) => (
                    <Badge key={domain} variant="secondary">
                      {domain}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Inputs
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {(tool.inputs ?? ["—"]).map((input) => (
                    <li key={input}>• {input}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Outputs
                </h3>
                <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                  {(tool.outputs ?? ["—"]).map((output) => (
                    <li key={output}>• {output}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Workflow mapping
              </h3>
              <div className="space-y-3">
                {(tool.steps ?? ["No steps available"]).map((step, index) => (
                  <div key={`${tool.name}-${index}`} className="relative pl-6">
                    <div className="absolute left-0 top-2 h-3 w-3 rounded-full border border-border bg-background" />
                    {index < (tool.steps?.length ?? 1) - 1 ? (
                      <div className="absolute left-[5px] top-5 h-6 w-px bg-border" />
                    ) : null}
                    <div className="rounded-lg border border-border bg-muted/30 px-3 py-2 text-sm text-foreground">
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-lg border border-border bg-background p-3 text-center">
                <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Last called</div>
                <div className="mt-1 font-semibold text-foreground">{tool.lastCalled}</div>
              </div>
              <div className="rounded-lg border border-border bg-background p-3 text-center">
                <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Success rate</div>
                <div className="mt-1 font-semibold text-foreground">{tool.successRate}</div>
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

