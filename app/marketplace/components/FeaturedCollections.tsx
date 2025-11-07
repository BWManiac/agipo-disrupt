import { collections } from "../data/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export function FeaturedCollections() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-slate-900">Featured Collections</h2>
          <p className="text-sm text-muted-foreground">
            Curated bundles to jumpstart common workflows.
          </p>
        </div>
        <Button variant="outline" className="hidden rounded-xl border-border/80 text-sm text-muted-foreground hover:text-primary sm:inline-flex">
          View all collections →
        </Button>
      </div>
      <ScrollArea className="-mx-2 w-[calc(100%+16px)] px-2">
        <div className="flex gap-4 pb-2">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} {...collection} />
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="hidden sm:flex" />
      </ScrollArea>
    </section>
  );
}

function CollectionCard({
  title,
  description,
  tags,
  accent,
}: (typeof collections)[number]) {
  return (
    <Card className={`min-w-[280px] rounded-3xl border-0 bg-gradient-to-br ${accent} text-white shadow-lg`}>
      <CardHeader className="gap-2">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <p className="text-sm text-white/80">{description}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2 text-xs font-medium text-white/90">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">
              {tag}
            </span>
          ))}
        </div>
        <Button variant="secondary" className="self-start rounded-xl bg-white/90 text-slate-900 hover:bg-white">
          Explore collection
        </Button>
      </CardContent>
    </Card>
  );
}
