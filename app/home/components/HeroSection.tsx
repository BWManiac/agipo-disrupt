"use client";

import { useEffect, useState } from "react";

import { rotatingMessages, heroTrustCopy } from "../data/mock-data";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ROTATION_INTERVAL = 3000;

export function HeroSection() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % rotatingMessages.length);
    }, ROTATION_INTERVAL);

    return () => clearInterval(id);
  }, []);

  return (
    <section className="border-b border-border bg-gradient-to-br from-slate-50 via-white to-white px-6 py-16 md:px-8 lg:px-12 xl:px-24">
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <p className="mb-3 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
          Agent Marketplace &amp; Orchestration
        </p>
        <h1 className="bg-gradient-to-r from-slate-900 via-slate-900 to-blue-600 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-[3.5rem]">
          Orchestrate your AI workforce.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Create, deploy, and manage multiple AI agents through natural language. Build
          transparent, scannable automations that run entirely in your browser.
        </p>
        <div className="mt-6 min-h-[1.5rem] text-sm font-medium text-muted-foreground/80">
          {rotatingMessages[messageIndex]}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button size="lg" className="px-6 py-6 text-base">
            Create an agent
          </Button>
          <Button variant="outline" size="lg" className="px-6 py-6 text-base">
            Browse marketplace
          </Button>
        </div>
        <p className="mt-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {heroTrustCopy}
        </p>
      </div>
    </section>
  );
}

export function HeroSpacer({ className }: { className?: string }) {
  return <div className={cn("h-4", className)} />;
}
