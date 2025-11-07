import { marketplaceAgents } from "../data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function MarketplaceSpotlight() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12 md:px-8 lg:px-12 xl:px-24">
      <header className="flex items-center justify-between gap-4">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-slate-900">Marketplace Spotlight</h2>
          <p className="text-sm text-muted-foreground">
            Featured agents the community is hiring this week.
          </p>
        </div>
        <Button variant="outline" className="hidden border-border/70 text-sm text-muted-foreground hover:border-primary/50 hover:text-primary sm:inline-flex">
          View all →
        </Button>
      </header>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {marketplaceAgents.map((agent) => (
          <Card key={agent.id} className="group border border-border/80 bg-white transition hover:border-primary/50 hover:shadow-lg">
            <CardHeader className="gap-3 pb-2">
              <div className="flex items-center gap-2">
                {agent.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="border-border/70 bg-slate-100 text-xs font-medium text-muted-foreground">
                    {tag}
                  </Badge>
                ))}
              </div>
              <CardTitle className="text-lg font-semibold text-slate-900">
                {agent.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 text-sm">
              <p className="text-muted-foreground">{agent.description}</p>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-900">
                <span className="text-amber-500">{ratingStars(agent.rating)}</span>
                <span>{agent.rating.toFixed(1)}</span>
                <span className="text-muted-foreground">• {agent.usage}</span>
              </div>
              <Button size="sm" className="w-full">
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
