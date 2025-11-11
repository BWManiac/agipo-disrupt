import { filters } from "../data/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

export function FilterSidebar() {
  return (
    <Card className="sticky top-6 h-fit rounded-2xl border border-border bg-background shadow-sm">
      <CardHeader className="border-b border-border/80 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold text-foreground">Filters</CardTitle>
          <Button variant="link" className="p-0 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Clear all
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 py-6">
        <ActiveFilters />
        <FilterGroup title="Use Case">
          {filters.useCases.map((filter) => (
            <FilterOption key={filter.id} label={filter.label} count={filter.count} />
          ))}
        </FilterGroup>
        <FilterGroup title="Complexity">
          {filters.complexity.map((filter) => (
            <FilterOption key={filter.id} label={filter.label} count={filter.count} />
          ))}
        </FilterGroup>
        <FilterGroup title="Pricing">
          {filters.pricing.map((filter) => (
            <FilterOption key={filter.id} label={filter.label} count={filter.count} />
          ))}
        </FilterGroup>
        <FilterGroup title="Creator">
          {filters.creator.map((filter) => (
            <FilterOption key={filter.id} label={filter.label} count={filter.count} />
          ))}
        </FilterGroup>
        <FilterGroup title="Minimum Rating">
          {filters.rating.map((filter) => (
            <FilterOption key={filter.id} label={filter.label} count={filter.count} />
          ))}
        </FilterGroup>
      </CardContent>
    </Card>
  );
}

function ActiveFilters() {
  return (
    <ScrollArea className="-mx-2 w-[calc(100%+16px)] px-2">
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="rounded-full bg-slate-100 text-xs text-muted-foreground">
          Customer Support ×
        </Badge>
        <Badge variant="secondary" className="rounded-full bg-slate-100 text-xs text-muted-foreground">
          4+ stars ×
        </Badge>
      </div>
    </ScrollArea>
  );
}

function FilterGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
        {title}
      </p>
      <div className="space-y-3 text-sm text-muted-foreground">{children}</div>
    </div>
  );
}

function FilterOption({ label, count }: { label: string; count: number | string }) {
  return (
    <label className="flex items-center justify-between gap-3">
      <span className="flex items-center gap-3">
        <Checkbox className="rounded-md border-border/80" />
        <span>{label}</span>
      </span>
      <span className="text-xs text-muted-foreground">({count})</span>
    </label>
  );
}
