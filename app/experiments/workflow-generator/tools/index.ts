import { addNodeTool } from "./addNode.tool";
import { connectNodesTool } from "./connectNodes.tool";
import { deleteNodeTool } from "./deleteNode.tool";
import { updateNodeLayerTool } from "./updateNodeLayer.tool";

export const workflowTools = {
  update_node_layer: updateNodeLayerTool,
  add_node: addNodeTool,
  delete_node: deleteNodeTool,
  connect_nodes: connectNodesTool,
} as const;

export type WorkflowToolMap = typeof workflowTools;

export * from "./toolIntents";
export * from "./applyToolResult";


