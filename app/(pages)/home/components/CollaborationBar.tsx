import { collaborators } from "../data/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function CollaborationBar() {
  return (
    <section className="rounded-2xl border border-border bg-background p-6 shadow-sm">
      <Card className="border-none bg-transparent shadow-none">
        <CardContent className="flex flex-col gap-4 p-0 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            <div>
              <p className="text-sm font-semibold text-foreground">Acme Corp Workspace</p>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Last edit: <span className="font-semibold text-foreground">2 hours ago</span>
              </p>
            </div>
            <div className="flex items-center -space-x-2">
              {collaborators.map((collaborator) => (
                <Avatar
                  key={collaborator.id}
                  className="border border-background bg-primary/10 text-primary"
                >
                  <AvatarFallback className="text-xs font-semibold uppercase">
                    {collaborator.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
              <span className="ml-4 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                +2 more
              </span>
            </div>
          </div>
          <Button variant="link" className="justify-start px-0 text-sm font-semibold text-foreground">
            View activity log
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
