# Workforce Agent API Route

This directory contains a single endpoint that powers every agent conversation in the workforce UI.  
Requests specify an agent identifier; the route loads its configuration and tool set from the `_tables` registry and instantiates an Agent SDK instance on the fly.

---

## Request Contract

```json
POST /api/workforce/agent
{
  "agentId": "pm",             // optional; defaults to Mira Patel
  "messages": [...],           // required; UIMessage array from @ai-sdk/react
  "context": "Optional string" // optional; appended as a system message
}
```

`messages` must be validated UI messages (the client uses `validateUIMessages` before posting).

## Response

Streaming response compatible with `@ai-sdk/react` `useChat` hook. The route simply forwards the stream returned by `Agent.respond`.

---

## Execution Flow

1. **Parse request** – read `agentId`, `messages`, and optional `context`. Missing `messages` returns `400`.
2. **Load agent** – `getAgentById(agentId ?? "pm")` from `_tables/agents`. Missing agent returns `404`.
3. **Resolve tools** – for each `toolId`, `getToolById` retrieves a `ToolDefinition`. Missing tools log warnings but continue.
4. **Instantiate Agent SDK** – `new Agent({ model, system: systemPrompt, tools: toolMap, stopWhen: stepCountIs(maxSteps ?? 3) })`.
5. **Validate messages** – pass `messages` and `toolMap` to `validateUIMessages`.
6. **Augment context** – optional `context` becomes a system message prepended to the validated array.
7. **Respond** – call `agent.respond({ messages: augmented })` and return the streaming response.

---

## Data Dependencies

| File | Purpose |
| --- | --- |
| `_tables/agents/*.ts` | Agent definitions (`AgentConfig` with `id`, `systemPrompt`, `model`, `toolIds`, etc.). |
| `_tables/agents/index.ts` | Aggregates agents; exports `agents` and `getAgentById`. |
| `_tables/tools/*.ts` | Tool definitions (`ToolDefinition` with metadata + executable `tool()` instance). |
| `_tables/tools/index.ts` | Aggregates tools; exports `tools` and `getToolById`. |
| `_tables/types.ts` | Type contracts (`AgentConfig`, `ToolDefinition`, `AgentStatus`). |

The UI (Workforce dashboard, modals) consumes the same registry to populate agent cards and tool usage lists.

---

## Logging & Error Handling

- `[workforce/agent] Loading agent: {id}` – confirms registry lookup.
- `[workforce/agent] Model: …, ToolIds: […]` – shows resolved tools.
- `[workforce/agent] Tools available: …` – lists tool keys passed to the Agent SDK.
- `[workforce/agent] Tool not found: {toolId}; skipping.` – indicates missing tool definition.
- 400 – missing `messages` array.  
- 404 – unknown `agentId`.  
- 500 – unexpected error; response body `{ message: "Agent failed to respond." }`.

---

## Client Entry Points

- `app/(pages)/workforce/components/AgentChat.tsx` – configures `DefaultChatTransport` pointing to this route and adds `agentId` to the request body.
- `app/(pages)/workforce/components/AgentModal.tsx` – passes `agent.id` to `AgentChat`.

---

## Extending the System

1. **Add a new agent** – create `_tables/agents/new-agent.ts`, include `toolIds`, quick prompts, objectives, etc. Export from `_tables/agents/index.ts`.
2. **Add a tool** – create `_tables/tools/new-tool.ts`, export `ToolDefinition` with `run: tool({ inputSchema, execute })`, export from `_tables/tools/index.ts`.
3. **The UI and API will pick up changes automatically** – no edits to this route are required.

---

## Related Docs

- `_docs/diary/entry9.md` – architectural notes on the dynamic agent registry.
- `_tasks/1-agent-registry-preflight.md` – phased rollout checklist and acceptance criteria.

Use this README as the reference when debugging or extending the workforce agent architecture.

