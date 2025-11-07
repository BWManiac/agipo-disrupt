import { creators } from "../data/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CreatorSpotlight() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-slate-900">Top Creators</h2>
          <p className="text-sm text-muted-foreground">
            Discover agencies and partners the community relies on.
          </p>
        </div>
        <Button variant="outline" className="hidden rounded-xl border-border/80 text-sm text-muted-foreground hover:text-primary sm:inline-flex">
          View all creators →
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {creators.map((creator) => (
          <Card key={creator.id} className="rounded-3xl border-border/80 bg-white shadow-sm">
            <CardHeader className="items-center gap-3 pb-2 text-center">
              <Avatar className="size-14 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                <AvatarFallback className="bg-transparent text-lg font-semibold">
                  {creator.initials}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-base font-semibold text-slate-900">
                {creator.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-center text-sm text-muted-foreground">
              <p>{creator.stats}</p>
              <Button variant="outline" className="w-full rounded-xl text-sm">
                View profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
