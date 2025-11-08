"use client";

import { DefaultChatTransport } from "ai";
import { useChat } from "@ai-sdk/react";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputTools,
  PromptInputTextarea,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import type { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { useState } from "react";

export function ChatPanel() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/agent" }),
  });
  const [input, setInput] = useState("");

  const handlePromptSubmit = ({ text }: PromptInputMessage) => {
    const trimmed = (text ?? "").trim();
    if (!trimmed) {
      return;
    }
    setInput("");
    return sendMessage({ text: trimmed });
  };

  const isSending = status === "submitted" || status === "streaming";
  const isSubmitDisabled = isSending || input.trim() === "";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: 360,
        borderRight: "1px solid var(--border)",
        height: "100vh",
      }}
    >
      <div style={{ padding: "12px 12px 8px 12px", fontWeight: 600 }}>
        Assistant
      </div>
      <Conversation>
        {messages.length === 0 ? (
          <ConversationEmptyState
            title="Start chatting"
            description="Ask to change Flow/Spec/Code or just say hello."
          />
        ) : (
          <ConversationContent>
            {messages.map((m) => {
              const textParts = m.parts.filter(
                (p: { type: string }) => p.type === "text"
              ) as Array<{ type: "text"; text: string }>;
              return (
                <Message from={m.role} key={m.id}>
                  <MessageContent>
                    {textParts.map((p, idx) => (
                      <div key={`${m.id}-${idx}`}>{p.text}</div>
                    ))}
                  </MessageContent>
                </Message>
              );
            })}
          </ConversationContent>
        )}
        <ConversationScrollButton />
      </Conversation>
      <div
        style={{
          padding: 12,
          borderTop: "1px solid var(--border)",
        }}
      >
        <PromptInput onSubmit={handlePromptSubmit}>
          <PromptInputBody>
            <PromptInputTextarea
              value={input}
              onChange={(event) => setInput(event.currentTarget.value)}
              placeholder="Ask the assistant..."
            />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools />
            <PromptInputSubmit
              status={status}
              disabled={isSubmitDisabled}
            />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}

