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
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.2),_rgba(255,255,255,0))]" />
      <CardHeader className="relative z-10">
        <CardTitle className="text-2xl font-semibold">Create an agent</CardTitle>
        <CardDescription className="text-sm text-white/70">
          Describe the agent you need in plain English
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 flex flex-col gap-4">
        <Input
          placeholder="Describe the agent you need…"
          className="border-white/20 bg-white/95 text-base text-slate-900 placeholder:text-slate-500 focus-visible:ring-white"
        />
        <div className="flex flex-wrap gap-2">
          {suggestedPrompts.map((prompt) => (
            <Badge
              key={prompt}
              className="border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 transition hover:bg-white/20"
            >
              {prompt}
            </Badge>
          ))}
        </div>
        <Button variant="link" className="self-start px-0 text-sm text-white/90">
          See how it works →
        </Button>
      </CardContent>
    </Card>
  );
}
