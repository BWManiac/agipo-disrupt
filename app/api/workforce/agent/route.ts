import {
  Experimental_Agent as Agent,
  stepCountIs,
  validateUIMessages,
  type Tool,
} from "ai";
import { NextResponse } from "next/server";
import { summarizeRisksTool } from "@/_tables/tools/prototype-risk-summary";

export const runtime = "nodejs";
export const maxDuration = 30;

const workforceChatAgent = new Agent({
  model: "google/gemini-2.5-flash",
  system:
    "You are a concise, helpful teammate. When the user lists product risks, call the summarize_risks tool to structure them before you respond.",
  tools: {
    summarize_risks: summarizeRisksTool,
  },
  stopWhen: stepCountIs(3),
});

type IncomingPayload = {
  messages?: unknown;
  agentName?: string;
  context?: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as IncomingPayload;
    const { messages, agentName, context } = payload;

    if (!messages) {
      return NextResponse.json({ message: "Missing messages array." }, { status: 400 });
    }

    // No tools for this spike; provide an empty validation map.
    const toolValidationMap = {
      summarize_risks: summarizeRisksTool,
    } as Record<string, Tool<unknown, unknown>>;

    type AgentMessage = Parameters<
      typeof workforceChatAgent.respond
    >[0]["messages"][number];
    const validated = await validateUIMessages<AgentMessage>({
      messages,
      tools: toolValidationMap,
    });

    // Prepend persona and optional context as system messages (system-first).
    const augmented: AgentMessage[] = [
      ...(agentName
        ? ([
            {
              role: "system",
              parts: [
                {
                  type: "text",
                  text: `You are ${agentName}, an AI Product Manager embedded with the team. Respond succinctly, highlight risks/opportunities, and ask clarifying questions when needed.`,
                },
              ],
            } as AgentMessage,
          ] as AgentMessage[])
        : []),
      ...(context
        ? ([
            {
              role: "system",
              parts: [
                {
                  type: "text",
                  text: `Additional context for this session:\n${context}`,
                },
              ],
            } as AgentMessage,
          ] as AgentMessage[])
        : []),
      ...validated,
    ];

    // Basic observability in dev.
    console.log("[/api/workforce/agent] messages:", Array.isArray(validated) ? validated.length : 0);

    const response = await workforceChatAgent.respond({ messages: augmented });
    console.log("[/api/workforce/agent] response sent");
    return response;
  } catch (error) {
    console.error("[/api/workforce/agent] error:", error);
    return NextResponse.json({ message: "Agent failed to respond." }, { status: 500 });
  }
}


