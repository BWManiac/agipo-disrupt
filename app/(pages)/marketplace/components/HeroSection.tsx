import { heroStats } from "../data/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";

export function HeroSection() {
  return (
    <section className="rounded-3xl border border-border/80 bg-white p-8 shadow-sm">
      <header className="flex flex-col gap-4">
        <Badge variant="outline" className="self-start uppercase tracking-[0.3em] text-xs">
          Agent Marketplace
        </Badge>
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-[2.75rem]">
            Agent Marketplace
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground lg:text-lg">
            Discover, evaluate, and hire AI agents to automate your workflows. Every agent
            is transparent, trusted, and runs securely in your browser.
          </p>
        </div>
      </header>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Input
            className="h-12 rounded-xl border-border/80 pl-11 text-base"
            placeholder="Search agents, categories, or creators..."
          />
          <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 rounded-xl px-4">
            Grid
          </Button>
          <Button variant="ghost" className="h-11 rounded-xl px-4 text-muted-foreground">
            List
          </Button>
          <Select defaultValue="popular">
            <SelectTrigger className="h-11 w-[180px] rounded-xl border-border/80 text-sm">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rated">Highest Rated</SelectItem>
              <SelectItem value="used">Most Used</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ScrollArea className="mt-6 w-full whitespace-nowrap">
        <div className="flex gap-4">
          {heroStats.map((stat) => (
            <Card key={stat.id} className="min-w-[160px] rounded-2xl border-border/80 bg-slate-50">
              <CardContent className="space-y-1 p-4 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  {stat.label}
                </p>
                <p className="text-xl font-semibold text-slate-900">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
}
