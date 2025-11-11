import { Task } from "../data/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const statusCopy: Record<Task["status"], string> = {
  success: "Success",
  warning: "Needs Review",
  error: "Error",
};

export function TaskCard({ task }: { task: Task }) {
  return (
    <Card className="group rounded-lg border border-border bg-muted/40 transition hover:border-foreground/30 hover:shadow-md">
      <CardContent className="flex flex-col gap-3 p-4">
        <div className="flex items-center gap-3">
          <Avatar className="size-9 border border-border/60 bg-primary/10 text-primary">
            <AvatarFallback className="bg-transparent text-xs font-semibold uppercase tracking-wide">
              {task.agentInitials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col text-sm font-semibold text-foreground">
            {task.title}
          </div>
        </div>
        <Badge variant="secondary" className={cn(statusStyles[task.status])}>
          {statusCopy[task.status]}
        </Badge>
        <span className="text-xs text-muted-foreground">{task.meta}</span>
        <div className="flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <TooltipProvider delayDuration={150}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 flex-1 text-xs">
                  Pause
                </Button>
              </TooltipTrigger>
              <TooltipContent>Pause this agent</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider delayDuration={150}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 flex-1 text-xs">
                  Inspect
                </Button>
              </TooltipTrigger>
              <TooltipContent>Inspect recent runs</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}

const statusStyles: Record<Task["status"], string> = {
  success: "border-none bg-emerald-100 text-emerald-700",
  warning: "border-none bg-amber-100 text-amber-700",
  error: "border-none bg-rose-100 text-rose-700",
};
