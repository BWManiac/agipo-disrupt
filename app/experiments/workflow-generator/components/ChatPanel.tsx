"use client";

import { DefaultChatTransport, getToolName, isToolUIPart } from "ai";
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
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "@/components/ai-elements/tool";
import { applyToolResult } from "../tools/applyToolResult";
import type { ToolResult } from "../tools/toolIntents";
import { useEffect, useRef, useState } from "react";

export function ChatPanel() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/agent" }),
  });
  const [input, setInput] = useState("");
  const processedToolCallIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    for (const message of messages) {
      for (const part of message.parts) {
        if (!isToolUIPart(part)) continue;
        if (part.state !== "output-available") continue;
        if (processedToolCallIds.current.has(part.toolCallId)) continue;

        processedToolCallIds.current.add(part.toolCallId);
        const result = part.output as ToolResult | undefined;
        if (result?.intent) {
          applyToolResult(result);
        }
      }
    }
  }, [messages]);

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

  const renderMessageParts = (messageParts: typeof messages[number]["parts"]) =>
    messageParts.map((part, idx) => {
      if (isToolUIPart(part)) {
        const toolTitle = String(getToolName(part));
        return (
          <Tool key={`${part.toolCallId}-${idx}`}>
            <ToolHeader state={part.state} type={part.type} title={toolTitle} />
            <ToolContent>
              {part.input ? <ToolInput input={part.input} /> : null}
              {part.state === "output-available" && part.output ? (
                <ToolOutput output={part.output} errorText={part.errorText} />
              ) : null}
              {part.state === "output-error" ? (
                <ToolOutput output={part.output} errorText={part.errorText} />
              ) : null}
            </ToolContent>
          </Tool>
        );
      }

      if (part.type === "text") {
        return (
          <div key={`text-${idx}`} className="whitespace-pre-wrap">
            {part.text}
          </div>
        );
      }

      return null;
    });

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
            {messages.map((m) => (
              <Message from={m.role} key={m.id}>
                <MessageContent>{renderMessageParts(m.parts)}</MessageContent>
              </Message>
            ))}
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

