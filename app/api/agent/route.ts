import {
  Experimental_Agent as Agent,
  stepCountIs,
  validateUIMessages,
  type Tool,
} from "ai";

import { workflowTools } from "@/app/experiments/workflow-generator/tools";

// Minimal chat-first agent (no tools yet). Uses AI Gateway for model routing.
// According to the docs, plain string models use AI Gateway by default when AI_GATEWAY_API_KEY is set.
// Ref: https://vercel.com/docs/ai-gateway/getting-started
export const runtime = "nodejs";
export const maxDuration = 30;

// Debug: log if the key is available (first 10 chars only for safety)
console.log("🔑 AI_GATEWAY_API_KEY present?", !!process.env.AI_GATEWAY_API_KEY);
if (process.env.AI_GATEWAY_API_KEY) {
  console.log("🔑 Key prefix:", process.env.AI_GATEWAY_API_KEY.substring(0, 10) + "...");
}

const chatAgent = new Agent({
  // Gemini 2.5 Flash via AI Gateway (https://vercel.com/ai-gateway/models/gemini-2.5-flash)
  model: "google/gemini-2.5-flash",
  system:
    "You are the Workflow Generator assistant. Answer succinctly. Do not attempt to change the canvas directly; you will later call tools to propose edits.",
  tools: workflowTools,
  stopWhen: stepCountIs(10), // Allow multi-step reasoning
});

export async function POST(request: Request) {
  try {
    const { messages, workflowContext } = await request.json();
    console.log("📨 Received", messages.length, "messages");

    // Validate UI messages from client; cast to broad type to satisfy agent generics.
    const toolValidationMap = workflowTools as unknown as Record<
      string,
      Tool<unknown, unknown>
    >;
    type AgentMessage = Parameters<
      typeof chatAgent.respond
    >[0]["messages"][number];
    const validated = await validateUIMessages<AgentMessage>({
      messages,
      tools: toolValidationMap,
    });
    
    // Stream a UI-friendly response compatible with @ai-sdk/react useChat
    const augmentedMessages: AgentMessage[] = [
      ...(workflowContext
        ? [
            {
              role: "system",
              parts: [
                {
                  type: "text",
                  text: `Current workflow state:\n${workflowContext}`,
                },
              ],
            } as AgentMessage,
          ]
        : []),
      ...validated,
    ];

    const response = await chatAgent.respond({
      messages: augmentedMessages,
    });
    console.log("✅ Agent response generated");
    return response;
  } catch (error) {
    console.error("❌ Agent route error:", error);
    throw error;
  }
}


