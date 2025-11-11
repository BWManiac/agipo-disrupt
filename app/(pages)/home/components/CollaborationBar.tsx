import { collaborators } from "../data/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function CollaborationBar() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-12 md:px-8 lg:px-12 xl:px-24">
      <Card className="border border-border/80 bg-slate-50/80">
        <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
            <div>
              <p className="text-sm font-semibold text-slate-900">Acme Corp Workspace</p>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Last edit: <span className="font-semibold text-slate-900">2 hours ago</span>
              </p>
            </div>
            <div className="flex items-center -space-x-2">
              {collaborators.map((collaborator) => (
                <Avatar
                  key={collaborator.id}
                  className="border border-white bg-gradient-to-br from-blue-500 to-indigo-500 text-white"
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
          <Button variant="link" className="justify-start px-0 text-sm text-primary">
            View activity log
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
