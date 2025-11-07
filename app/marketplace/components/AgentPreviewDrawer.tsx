import { previewAgent } from "../data/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type PreviewAgent = typeof previewAgent;

export function AgentPreviewDrawer({
  open,
  onOpenChange,
  agent,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agent: PreviewAgent | null;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-xl border-l border-border/60 p-0">
        <SheetHeader className="border-b border-border/70 px-6 py-5 text-left">
          <SheetTitle className="text-lg font-semibold text-slate-900">
            {agent?.title ?? "Agent Preview"}
          </SheetTitle>
          <p className="text-sm text-muted-foreground">
            {agent?.creator ? `by ${agent.creator}` : ""}
          </p>
        </SheetHeader>
        <ScrollArea className="h-[80vh] px-6 py-6">
          {agent ? <AgentDetails agent={agent} /> : <EmptyPreview />}
        </ScrollArea>
        <SheetFooter className="border-t border-border/70 px-6 py-4">
          <div className="flex w-full gap-3">
            <Button variant="outline" className="flex-1 rounded-xl">
              View full details
            </Button>
            <Button className="flex-1 rounded-xl">Add to workspace</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function AgentDetails({ agent }: { agent: PreviewAgent }) {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          {agent.verified && (
            <Badge className="rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700">
              Verified
            </Badge>
          )}
          <span className="text-sm font-medium text-slate-900">
            {agent.rating.toFixed(1)} • {agent.reviews.toLocaleString()} reviews
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{agent.description}</p>
      </div>

      <Section title="Key Features">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {agent.features.map((feature) => (
            <li key={feature} className="rounded-lg bg-slate-100/80 px-3 py-2">
              {feature}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Requirements">
        <ul className="space-y-2 text-sm text-muted-foreground">
          {agent.requirements.map((requirement) => (
            <li key={requirement} className="rounded-lg bg-slate-100/80 px-3 py-2">
              {requirement}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Performance">
        <div className="grid gap-3 md:grid-cols-3">
          {agent.metrics.map((metric) => (
            <Card key={metric.label} className="rounded-2xl border-border/80 bg-slate-50 shadow-none">
              <CardContent className="space-y-1 p-3 text-center">
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
                  {metric.label}
                </p>
                <p className="text-base font-semibold text-slate-900">{metric.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Recent Reviews">
        <div className="space-y-3">
          {agent.reviews.map((review) => (
            <Card key={review.author} className="rounded-2xl border-border/80 bg-slate-50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-slate-900">
                  {review.author}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0 text-sm text-muted-foreground">
                “{review.text}”
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  );
}

function EmptyPreview() {
  return (
    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
      Select an agent to preview details.
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function buildPreviewAgent(partial: {
  title: string;
  initials: string;
  rating: number;
  reviews: number;
  description: string;
  badge: string;
  verified?: boolean;
}) {
  return {
    ...previewAgent,
    ...partial,
  } satisfies PreviewAgent;
}
