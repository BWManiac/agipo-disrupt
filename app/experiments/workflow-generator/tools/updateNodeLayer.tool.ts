import { tool } from "ai";
import { z } from "zod";

import type { ToolResult, UpdateNodeLayerIntent } from "./toolIntents";

const contractFieldSchema = z.object({
  name: z.string().min(1).describe("Field name"),
  type: z.string().min(1).describe("Field type"),
  description: z.string().optional().describe("Optional description"),
  optional: z.boolean().optional().describe("Whether the field is optional"),
});

export const updateNodeLayerTool = tool({
  description:
    "Update an existing workflow node's layers (title, code, flow summary, or spec contracts).",
  inputSchema: z.object({
    nodeId: z
      .string()
      .min(1)
      .describe("The ID of the node to update (use node.data.id)."),
    title: z
      .string()
      .optional()
      .describe("Optional new title for the node."),
    code: z
      .string()
      .optional()
      .describe("Optional replacement for the node's code layer."),
    flowSummary: z
      .string()
      .optional()
      .describe("Optional replacement for the node's flow summary."),
    spec: z
      .object({
        inputs: contractFieldSchema.array().optional(),
        outputs: contractFieldSchema.array().optional(),
        process: z.array(z.string()).optional(),
      })
      .optional()
      .describe(
        "Optional replacement spec payload. Provide full arrays for any section you update."
      ),
    rationale: z
      .string()
      .optional()
      .describe("Brief explanation of why the update is needed."),
    summary: z
      .string()
      .optional()
      .describe("Human-readable summary of the change for the UI."),
  }),
  async execute(input): Promise<ToolResult> {
    const intent: UpdateNodeLayerIntent = {
      type: "updateNodeLayer",
      nodeId: input.nodeId,
      changes: {
        ...(input.title ? { title: input.title } : {}),
        ...(input.code ? { code: input.code } : {}),
        ...(input.flowSummary ? { flowSummary: input.flowSummary } : {}),
        ...(input.spec ? { spec: input.spec } : {}),
      },
      rationale: input.rationale,
    };

    return {
      intent,
      summary:
        input.summary ??
        `Updated node ${input.nodeId}${input.title ? ` title to "${input.title}"` : ""}.`,
    };
  },
});


