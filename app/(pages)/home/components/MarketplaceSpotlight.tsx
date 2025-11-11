import { marketplaceAgents } from "../data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function MarketplaceSpotlight() {
  return (
    <section className="rounded-2xl border border-border bg-background p-6 shadow-sm">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-foreground">Marketplace Spotlight</h2>
          <p className="text-sm text-muted-foreground">Featured agents the community is hiring this week.</p>
        </div>
        <Button
          variant="outline"
          className="hidden rounded-full border-border px-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground hover:border-foreground/40 hover:text-foreground sm:inline-flex"
        >
          View all →
        </Button>
      </header>
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {marketplaceAgents.map((agent) => (
          <Card
            key={agent.id}
            className="group rounded-xl border border-border bg-card transition hover:border-foreground/30 hover:shadow-lg"
          >
            <CardHeader className="gap-3 pb-2">
              <div className="flex flex-wrap items-center gap-2">
                {agent.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded-full border-border bg-muted/40 text-xs font-medium text-muted-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <CardTitle className="text-base font-semibold text-foreground">
                {agent.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 text-sm">
              <p className="text-muted-foreground">{agent.description}</p>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                <span className="text-amber-500">{ratingStars(agent.rating)}</span>
                <span className="text-foreground">{agent.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">• {agent.usage}</span>
              </div>
              <Button size="sm" className="w-full rounded-full">
                Add to workspace
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function ratingStars(rating: number) {
  const rounded = Math.round(rating);
  return "★★★★★".slice(0, rounded) + "☆☆☆☆☆".slice(rounded);
}
