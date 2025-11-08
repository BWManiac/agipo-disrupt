import { tool } from "ai";
import { z } from "zod";

import type { AddNodeIntent, ToolResult } from "./toolIntents";

const contractFieldSchema = z.object({
  name: z.string().min(1).describe("Field name"),
  type: z.string().min(1).describe("Field type"),
  description: z.string().optional(),
  optional: z.boolean().optional(),
});

const positionSchema = z.object({
  x: z.number().describe("Canvas X coordinate for the new node."),
  y: z.number().describe("Canvas Y coordinate for the new node."),
});

export const addNodeTool = tool({
  description:
    "Create a new workflow node, optionally providing code, flow summary, spec metadata, and suggested connections.",
  inputSchema: z.object({
    title: z
      .string()
      .optional()
      .describe("Optional node title. Defaults to a generated name."),
    code: z
      .string()
      .optional()
      .describe("Optional code layer contents for the new node."),
    flowSummary: z
      .string()
      .optional()
      .describe("Optional flow summary explaining the step."),
    spec: z
      .object({
        inputs: contractFieldSchema.array().optional(),
        outputs: contractFieldSchema.array().optional(),
        process: z.array(z.string()).optional(),
      })
      .optional()
      .describe("Optional spec metadata for inputs, process steps, and outputs."),
    position: positionSchema
      .optional()
      .describe(
        "Optional absolute position for the node. Defaults to automatic placement."
      ),
    connectFrom: z
      .string()
      .optional()
      .describe(
        "Optional upstream node ID to connect from (edge: connectFrom -> newNode)."
      ),
    connectTo: z
      .string()
      .optional()
      .describe(
        "Optional downstream node ID to connect to (edge: newNode -> connectTo)."
      ),
    rationale: z
      .string()
      .optional()
      .describe("Brief explanation of why the node should be added."),
    summary: z
      .string()
      .optional()
      .describe("Human-readable summary for the UI."),
  }),
  async execute(input): Promise<ToolResult> {
    const intent: AddNodeIntent = {
      type: "addNode",
      node: {
        title: input.title,
        code: input.code,
        flowSummary: input.flowSummary,
        spec: input.spec,
        position: input.position,
      },
      connections: {
        from: input.connectFrom ?? null,
        to: input.connectTo ?? null,
      },
      rationale: input.rationale,
    };

    return {
      intent,
      summary:
        input.summary ??
        `Added node${input.title ? ` "${input.title}"` : ""}${
          input.connectFrom ? ` after ${input.connectFrom}` : ""
        }.`,
    };
  },
});


