import { metrics } from "../data/mock-data";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MetricsOverview() {
  return (
    <section className="mx-auto grid max-w-6xl gap-4 px-6 py-8 md:px-8 lg:grid-cols-4 lg:px-12 xl:px-24">
      {metrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </section>
  );
}

function MetricCard({
  metric,
}: {
  metric: (typeof metrics)[number];
}) {
  return (
    <Card className="border border-border/80 bg-white shadow-sm transition hover:shadow-md">
      <CardContent className="flex flex-col gap-4">
        <CardDescription className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
          {metric.label}
        </CardDescription>
        <CardTitle className="text-3xl font-bold text-slate-900">
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
