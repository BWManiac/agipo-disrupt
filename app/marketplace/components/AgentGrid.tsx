"use client";

import { useState } from "react";

import { agents } from "../data/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { AgentPreviewDrawer, buildPreviewAgent, PreviewAgent } from "./AgentPreviewDrawer";

export function AgentGrid() {
  const [open, setOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<PreviewAgent | null>(null);

  const handleOpen = (agent: (typeof agents)[number]) => {
    setSelectedAgent(
      buildPreviewAgent({
        title: agent.title,
        rating: agent.rating,
        reviewCount: agent.reviews,
        description: agent.description,
        initials: agent.initials,
        badge: agent.badge,
        creator: agent.verified ? "AGIPO" : "Community",
        verified: agent.verified,
      })
    );
    setOpen(true);
  };

  return (
    <TooltipProvider>
      <section className="space-y-4">
        <header className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-slate-900">Agents</h2>
            <p className="text-sm text-muted-foreground">
              Browse agents the community trusts.
            </p>
          </div>
        </header>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {agents.map((agent) => (
            <Card
              key={agent.id}
              className="group rounded-3xl border-border/70 bg-white shadow-sm transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg"
            >
              <CardHeader className="flex flex-row items-start gap-4 pb-2">
                <Avatar className="size-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
                  <AvatarFallback className="bg-transparent text-base font-semibold">
                    {agent.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <CardTitle className="text-lg font-semibold text-slate-900">
                    {agent.title}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">by {agent.verified ? "AGIPO" : "Community"}</p>
                </div>
                {agent.badge === "Pro" && (
                  <Badge className="ml-auto rounded-full bg-amber-100 text-xs font-semibold text-amber-700">
                    Pro
                  </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>{agent.description}</p>
                <div className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
                  {agent.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <span className="text-amber-500">{ratingStars(agent.rating)}</span>
                  <span>{agent.rating.toFixed(1)}</span>
                  <span className="text-muted-foreground">• {agent.usage}</span>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 rounded-xl" onClick={() => handleOpen(agent)}>
                    Add to workspace
                  </Button>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="rounded-xl text-xs text-muted-foreground"
                        onClick={() => handleOpen(agent)}
                      >
                        Preview
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Preview highlights</TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <AgentPreviewDrawer open={open} onOpenChange={setOpen} agent={selectedAgent} />
      </section>
    </TooltipProvider>
  );
}

function ratingStars(rating: number) {
  const rounded = Math.round(rating);
  return "★★★★★".slice(0, rounded) + "☆☆☆☆☆".slice(rounded);
}
