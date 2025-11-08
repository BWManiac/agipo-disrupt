"use client";

import { NodeEditor } from "../editor/NodeEditor";
import type { WorkflowNode } from "../../store/types";

type EditorPanelProps = {
  node: WorkflowNode | null;
};

export function EditorPanel({ node }: EditorPanelProps) {
  if (!node) {
    return (
      <div className="flex h-full items-center justify-center p-6 text-sm text-slate-400">
        Select a node to edit its details.
      </div>
    );
  }

  return <NodeEditor node={node} />;
}

