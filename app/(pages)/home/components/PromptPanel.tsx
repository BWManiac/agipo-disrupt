import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const suggestedPrompts = [
  "Monitor email for support",
  "Generate financial reports",
  "Transform CSV data",
];

export function PromptPanel() {
  return (
    <Card className="rounded-2xl border border-border bg-background shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">Create an agent</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Describe the agent you need in plain English
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <Input
          placeholder="Describe the agent you need…"
          className="border-border/50 text-sm"
        />
        <div className="flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt) => (
            <Badge
              key={prompt}
              variant="secondary"
              className="rounded-full border-border bg-muted/40 px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {prompt}
            </Badge>
          ))}
        </div>
        <Button variant="link" className="self-start px-0 text-sm font-semibold text-foreground">
          See how it works →
        </Button>
      </CardContent>
    </Card>
  );
}
