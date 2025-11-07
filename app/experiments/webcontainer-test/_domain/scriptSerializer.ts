import type { WorkflowChain } from "./chainPlanner";

const escapeSingleQuotes = (code: string): string =>
  code.replace(/'/g, `'\\''`);

export const buildWriteCommands = (chain: WorkflowChain): string =>
  chain
    .map(
      (node) =>
        `echo '${escapeSingleQuotes(node.data.code)}' > /tmp/node-${node.id}.js`
    )
    .join(" && ");

export const buildExecuteCommands = (chain: WorkflowChain): string =>
  chain.map((node) => `node /tmp/node-${node.id}.js`).join(" | ");

export const buildFullCommand = (chain: WorkflowChain): string => {
  const writeCommands = buildWriteCommands(chain);
  const executeCommands = buildExecuteCommands(chain);
  return `cd /tmp && ${writeCommands} && ${executeCommands}`;
};

