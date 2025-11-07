import { activityItems } from "../data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const filters = ["All", "Success", "Errors", "Alerts"];

export function ActivityPanel() {
  return (
    <Card className="border border-border/80 bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-slate-900">
          Live Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <Badge
              key={filter}
              variant={filter === "All" ? "default" : "secondary"}
              className={cn(
                "cursor-pointer rounded-full px-3 py-1 text-xs font-semibold",
                filter === "All"
                  ? "bg-primary text-primary-foreground"
                  : "bg-slate-100 text-muted-foreground border-border"
              )}
            >
              {filter}
            </Badge>
          ))}
        </div>
        <ScrollArea className="h-[320px] pr-2">
          <div className="flex flex-col gap-3">
            {activityItems.map((item) => (
              <ActivityItem key={item.id} {...item} />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

function ActivityItem({
  label,
  description,
  time,
  type,
  showPulse,
}: (typeof activityItems)[number]) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border/70 bg-slate-50/80 p-3 text-sm shadow-sm",
        type === "success" && "border-l-4 border-l-emerald-500",
        type === "warning" && "border-l-4 border-l-amber-500",
        type === "error" && "border-l-4 border-l-rose-500"
      )}
    >
      <div className="flex items-center gap-2">
        {showPulse && (
          <span className="relative inline-flex size-2 rounded-full bg-emerald-500">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60" />
          </span>
        )}
        <strong className="text-slate-900">{label}</strong>
        <span className="text-muted-foreground">{description}</span>
      </div>
      <div className="mt-1 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
        {time}
      </div>
    </div>
  );
}
