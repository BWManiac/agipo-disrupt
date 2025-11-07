import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const trustBadges = [
  { id: "soc2", icon: "🔒", label: "SOC 2 Certified" },
  { id: "iso", icon: "✅", label: "ISO 27001" },
  { id: "gdpr", icon: "🌐", label: "GDPR Compliant" },
  { id: "browser", icon: "⚡", label: "Browser-based" },
];

export function TrustStrip() {
  return (
    <Card className="rounded-3xl border-border/80 bg-white shadow-sm">
      <CardContent className="space-y-6 p-8 text-center">
        <h3 className="text-lg font-semibold text-slate-900">
          Trusted by teams worldwide
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {trustBadges.map((badge) => (
            <div key={badge.id} className="flex flex-col items-center gap-2">
              <div className="flex size-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
                {badge.icon}
              </div>
              <Badge variant="secondary" className="rounded-full bg-slate-100 text-xs text-muted-foreground">
                {badge.label}
              </Badge>
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground">
          All agents run securely in your browser via WebContainers. Your data never leaves
          your workspace unless explicitly configured.
        </p>
      </CardContent>
    </Card>
  );
}
