"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const quickActions = ["Create an agent", "Check status", "View docs"];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm your AGIPO assistant. I can help you create agents, answer questions, or troubleshoot issues. What would you like to do?",
      time: "Just now",
    },
  ]);
  const [draft, setDraft] = useState("");

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      time: "Just now",
    };
    setMessages((prev) => [...prev, userMessage]);
    setDraft("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `I understand you want to "${content}". Would you like me to create an agent for this task, or do you have questions about how it works?`,
          time: "Just now",
        },
      ]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        size="icon-lg"
        className="rounded-full bg-primary text-2xl text-primary-foreground shadow-lg"
        onClick={() => setOpen(true)}
      >
        💬
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="h-[520px] rounded-t-3xl border-border/70 bg-white p-0 sm:right-6 sm:bottom-6 sm:h-[620px] sm:w-[420px] sm:rounded-3xl">
          <SheetHeader className="border-b border-border/70 px-6 py-4">
            <SheetTitle className="flex items-center gap-3 text-base font-semibold text-slate-900">
              <Badge className="size-2 rounded-full bg-emerald-500" />
              AGIPO Assistant
            </SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-[320px] px-6 py-4">
            <div className="flex flex-col gap-4">
              {messages.map((message) => (
                <ChatBubble key={message.id} message={message} />
              ))}
            </div>
          </ScrollArea>
          <SheetFooter className="flex flex-col gap-3 border-t border-border/70 px-6 py-4">
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action) => (
                <Button
                  key={action}
                  variant="outline"
                  size="sm"
                  className="border-border/60 text-xs text-muted-foreground"
                  onClick={() => sendMessage(action)}
                >
                  {action}
                </Button>
              ))}
            </div>
            <div className="flex items-end gap-2">
              <Textarea
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    sendMessage(draft);
                  }
                }}
                rows={2}
                placeholder="Type your message..."
                className="min-h-[44px] flex-1 resize-none border-border/70"
              />
              <Button className="self-stretch" onClick={() => sendMessage(draft)}>
                Send
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <Avatar className="size-8 bg-gradient-to-br from-blue-600 to-indigo-600 text-white">
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`max-w-[75%] rounded-2xl border px-4 py-2 text-sm shadow-sm ${
          isUser
            ? "border-primary/20 bg-primary text-primary-foreground"
            : "border-border/70 bg-slate-50"
        }`}
      >
        <p>{message.content}</p>
        <span className="mt-2 block text-[10px] font-medium uppercase tracking-[0.25em] text-white/80">
          {message.time}
        </span>
      </div>
      {isUser && (
        <Avatar className="size-8 border border-primary bg-primary/10 text-primary">
          <AvatarFallback>YO</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  time: string;
};
