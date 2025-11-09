"use client";

/**
 * ChatPanel
 *
 * - Hosts the AI assistant inside the workflow generator’s left rail.
 * - Supplies Gemini with serialized workflow state on every turn without showing
 *   that payload in the UI. We do this by attaching the context to the transport
 *   request and letting the API route prepend the system message server-side.
 * - Renders tool invocations using the AI Elements components so designers and
 *   developers can inspect inputs/outputs, and executes read-only client tools
 *   such as `inspect_node` where the browser has the freshest Zustand state.
 *
 * This component aims to be “transport + rendering glue” while the server owns
 * all agent orchestration.
 */
import {
  DefaultChatTransport,
  getToolName,
  isToolUIPart,
} from "ai";
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
import { useEffect, useMemo, useRef, useState } from "react";
import { useWorkflowGeneratorStore } from "../store";
import { serializeWorkflowContext } from "../services/workflowContextService";

export function ChatPanel() {
  /**
   * Custom transport that always injects the latest workflow context into the
   * outgoing request body. The server will translate this into a system message,
   * keeping the UI transcripts clean and complying with Gemini’s ordering rules.
   */
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/agent",
        prepareSendMessagesRequest: async ({
          id,
          messages,
          body,
          trigger,
          messageId,
        }) => {
          const workflowContext = serializeWorkflowContext(
            useWorkflowGeneratorStore.getState()
          );

          return {
            body: {
              ...(body ?? {}),
              id,
              messages,
              trigger,
              messageId,
              workflowContext,
            },
          };
        },
      }),
    []
  );

  const { messages, sendMessage, status, addToolResult } = useChat({
    transport,
  });
  const [input, setInput] = useState("");
  const processedToolCallIds = useRef<Set<string>>(new Set());
  const handledInspectToolCalls = useRef<Set<string>>(new Set());

  useEffect(() => {
    // When tool responses arrive, convert their structured intent payloads into
    // direct Zustand mutations so the canvas reflects agent decisions instantly.
    for (const message of messages) {
      for (const part of message.parts) {
        if (!isToolUIPart(part)) continue;

         if (
          String(getToolName(part)) === "inspect_node" &&
          part.state === "input-available" &&
          !handledInspectToolCalls.current.has(part.toolCallId)
        ) {
          handledInspectToolCalls.current.add(part.toolCallId);

          const nodeId =
            typeof (part.input as Record<string, unknown> | undefined)?.nodeId ===
            "string"
              ? ((part.input as Record<string, unknown>).nodeId as string)
              : undefined;
          const includeConnections =
            typeof (part.input as Record<string, unknown> | undefined)
              ?.includeConnections === "boolean"
              ? Boolean(
                  (part.input as Record<string, unknown>).includeConnections
                )
              : false;

          const state = useWorkflowGeneratorStore.getState();
          const node = nodeId
            ? state.nodes.find((candidate) => candidate.id === nodeId)
            : undefined;

          if (!nodeId || !node) {
            void addToolResult({
              state: "output-error",
              tool: "inspect_node",
              toolCallId: part.toolCallId,
              errorText: nodeId
                ? `Node ${nodeId} was not found.`
                : "Node ID missing in inspect request.",
            });
            continue;
          }

          const incomingEdges = includeConnections
            ? state.edges.filter((edge) => edge.target === nodeId)
            : [];
          const outgoingEdges = includeConnections
            ? state.edges.filter((edge) => edge.source === nodeId)
            : [];

          void addToolResult({
            state: "output-available",
            tool: "inspect_node",
            toolCallId: part.toolCallId,
            output: {
              node: {
                id: node.id,
                title: node.data.title,
                code: node.data.code,
                flowSummary: node.data.flow.summary,
                spec: node.data.spec,
                position: node.position,
              },
              incomingEdges,
              outgoingEdges,
            },
          });
        }

        if (part.state !== "output-available") continue;
        if (processedToolCallIds.current.has(part.toolCallId)) continue;

        processedToolCallIds.current.add(part.toolCallId);
        const result = part.output as ToolResult | undefined;
        if (result?.intent) {
          applyToolResult(result);
        }
      }
    }
  }, [messages, addToolResult]);

  const handlePromptSubmit = ({ text }: PromptInputMessage) => {
    const trimmed = (text ?? "").trim();
    if (!trimmed) {
      return;
    }
    setInput("");

    return sendMessage({
      text: trimmed,
    });
  };

  const isSending = status === "submitted" || status === "streaming";
  const isSubmitDisabled = isSending || input.trim() === "";

  /**
   * Render helper that streams tool cards and assistant/user text. System
   * messages are filtered out earlier, so only visible text reaches end users.
   */
  const renderMessageParts = (message: typeof messages[number]) =>
    message.parts.map((part, idx) => {
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

      if (part.type === "text" && message.role !== "system") {
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
            {messages
              .filter((message) => message.role !== "system")
              .map((message) => (
                <Message from={message.role} key={message.id}>
                  <MessageContent>{renderMessageParts(message)}</MessageContent>
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

