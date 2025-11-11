"use server";

import { Experimental_Agent as Agent, stepCountIs, validateUIMessages, type Tool } from "ai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

const personaPrompt = `
You are Mira Patel, an AI Product Manager embedded with the Agipo team.
Your responsibilities:
- Monitor product initiatives, risks, and stakeholder needs.
- Surface concise updates, approvals needed, and next steps.
- Ask for clarification when context is missing.
- Respond in short paragraphs (2-4 sentences). Bullet lists are welcome for action items.
Maintain a calm, confident tone. Invite collaboration and highlight risks or opportunities when relevant.
`;

const pmAgent = new Agent({
  model: "google/gemini-2.5-pro",
  system: personaPrompt.trim(),
  tools: {},
  stopWhen: stepCountIs(8),
});

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as {
      messages?: unknown;
      agentName?: string;
      context?: string;
      data?: { agentName?: string; context?: string };
    };
    const messages = payload.messages;
    const agentName = payload.agentName ?? payload.data?.agentName;
    const context = payload.context ?? payload.data?.context;

    if (!messages) {
      return NextResponse.json({ message: "Missing messages array." }, { status: 400 });
    }

    const toolValidationMap = {} as Record<string, Tool<unknown, unknown>>;

    type AgentMessage = Parameters<typeof pmAgent.respond>[0]["messages"][number];

    const validated = await validateUIMessages<AgentMessage>({
      messages,
      tools: toolValidationMap,
    });

    const augmentedMessages: AgentMessage[] = [
      ...(agentName
        ? [
            {
              role: "system",
              parts: [
                {
                  type: "text",
                  text: `User is collaborating with you as ${agentName}. Always act as their product manager counterpart.`,
                },
              ],
            } as AgentMessage,
          ]
        : []),
      ...(context
        ? [
            {
              role: "system",
              parts: [
                {
                  type: "text",
                  text: `Additional context: ${context}`,
                },
              ],
            } as AgentMessage,
          ]
        : []),
      ...validated,
    ];

    return pmAgent.respond({
      messages: augmentedMessages,
    });
  } catch (error) {
    console.error("PM agent route error:", error);
    return NextResponse.json(
      { message: "Failed to contact product manager agent." },
      { status: 500 }
    );
  }
}
