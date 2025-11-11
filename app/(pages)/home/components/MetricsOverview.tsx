import { metrics } from "../data/mock-data";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MetricsOverviewProps = {
  className?: string;
};

export function MetricsOverview({ className }: MetricsOverviewProps) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2 xl:grid-cols-4", className)}>
      {metrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
}

function MetricCard({
  metric,
}: {
  metric: (typeof metrics)[number];
}) {
  return (
    <Card className="border border-border bg-card shadow-sm transition hover:border-foreground/20 hover:shadow-md">
      <CardContent className="flex flex-col gap-4 p-5">
        <CardDescription className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          {metric.label}
        </CardDescription>
        <CardTitle className="text-2xl font-semibold text-foreground">
          {metric.value}
        </CardTitle>
        <span
          className={cn(
            "text-sm font-medium",
            metric.trendPositive ? "text-emerald-600" : "text-rose-600"
          )}
        >
          {metric.trendLabel}
        </span>
      </CardContent>
    </Card>
  );
}
