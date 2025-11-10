import { quickChatMessages } from "../data/mock-data";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const quickActions = ["Handoff summary", "Request update", "Pause agent"];

export function AgentQuickChat() {
  return (
    <Card className="border border-border/80 bg-white">
      <CardHeader className="gap-2 pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-slate-900">
            Quick Chat
          </CardTitle>
          <Badge className="rounded-full bg-emerald-100 text-xs font-semibold text-emerald-700">
            Live
          </Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          Stay in sync with your agents. Ask a question or give instructions without leaving the dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ScrollArea className="h-[240px] pr-2">
          <div className="flex flex-col gap-4">
            {quickChatMessages.map((message) => (
              <MessageBubble key={message.id} author={message.author} content={message.content} timestamp={message.timestamp} />
            ))}
          </div>
        </ScrollArea>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <Button key={action} variant="outline" size="sm" className="border-border/70 text-xs text-muted-foreground">
              {action}
            </Button>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center gap-2 border-t border-border/70 bg-slate-50/60 p-4">
        <Input placeholder="Type a quick instruction…" className="flex-1 border-border/60" />
        <Button size="sm">Send</Button>
      </CardFooter>
    </Card>
  );
}

type MessageBubbleProps = {
  author: "user" | "agent";
  content: string;
  timestamp: string;
};

function MessageBubble({ author, content, timestamp }: MessageBubbleProps) {
  const isUser = author === "user";

  return (
    <div className={cn("flex items-start gap-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <Avatar className="size-8 bg-gradient-to-br from-blue-500 to-indigo-500 text-white shadow-sm">
          <AvatarFallback className="text-xs font-semibold uppercase">AI</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[75%] rounded-2xl border px-4 py-3 text-sm shadow-sm",
          isUser
            ? "border-primary/30 bg-primary text-primary-foreground"
            : "border-border/70 bg-slate-50/90"
        )}
      >
        <p className="leading-snug">{content}</p>
        <span className={cn("mt-2 block text-[10px] font-semibold uppercase tracking-[0.25em]", isUser ? "text-white/80" : "text-muted-foreground/80")}>
          {timestamp}
        </span>
      </div>
      {isUser && (
        <Avatar className="size-8 border border-primary/40 bg-primary/5 text-primary shadow-sm">
          <AvatarFallback className="text-xs font-semibold uppercase">You</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}


