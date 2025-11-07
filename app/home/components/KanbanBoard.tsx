import { kanbanColumns } from "../data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskCard } from "./TaskCard";

export function KanbanBoard() {
  return (
    <Card className="border border-border/80 bg-white">
      <CardHeader className="flex flex-col gap-3 border-b border-border/70 pb-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-slate-900">
            Agent Tasks
          </CardTitle>
          <button className="inline-flex h-9 items-center rounded-md border border-border/80 px-3 text-sm font-medium text-muted-foreground transition hover:border-primary/50 hover:text-primary">
            Filter
          </button>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 py-6 lg:grid-cols-4">
        {kanbanColumns.map((column) => (
          <div key={column.id} className="flex flex-col gap-3">
            <header className="flex items-center justify-between border-b border-border/70 pb-3">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
                {column.title}
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                {column.count}
              </span>
            </header>
            <div className="flex flex-col gap-3">
              {column.tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
