import { kanbanColumns } from "../data/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TaskCard } from "./TaskCard";

export function KanbanBoard() {
  return (
    <Card className="rounded-2xl border border-border bg-background shadow-sm">
      <CardHeader className="flex flex-col gap-3 border-b border-border/80 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="text-xl font-semibold text-foreground">
            Agent Tasks
          </CardTitle>
          <button className="inline-flex h-9 items-center rounded-md border border-border px-3 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground transition hover:border-foreground/40 hover:text-foreground">
            Filter
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 py-6">
        <div className="hidden gap-6 md:grid md:grid-cols-2 xl:grid-cols-4">
          {kanbanColumns.map((column) => (
            <Column key={column.id} {...column} />
          ))}
        </div>
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:hidden">
          {kanbanColumns.map((column) => (
            <div key={column.id} className="min-w-[260px] snap-center">
              <Column {...column} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function Column({ title, count, tasks }: (typeof kanbanColumns)[number]) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-muted/30 p-4 shadow-sm">
      <header className="flex items-center justify-between border-b border-border/70 pb-3">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
          {title}
        </span>
        <span className="rounded-full border border-border/60 bg-background px-2 py-0.5 text-xs font-semibold text-muted-foreground">
          {count}
        </span>
      </header>
      <div className="flex flex-col gap-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        {!tasks.length && (
          <div className="rounded-lg border border-dashed border-border/60 bg-background/80 p-4 text-xs text-muted-foreground">
            No tasks here yet.
          </div>
        )}
      </div>
    </div>
  );
}
