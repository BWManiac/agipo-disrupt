import { webcontainerRuntime } from "./webcontainerRuntime";
import { Workflow } from "../_domain/workflow";
import { WorkflowChain, buildChains } from "../_domain/chainPlanner";
import { buildFullCommand } from "../_domain/scriptSerializer";

type StreamHandler = (chunk: string) => void;

type ChainLifecycleHandlers = {
  onChainStart?: (chain: WorkflowChain) => void;
  onChainComplete?: (chain: WorkflowChain) => void;
};

export const installDependency = async (
  packageName: string,
  onOutput: StreamHandler
): Promise<void> => {
  if (!packageName) {
    return;
  }

  const process = await webcontainerRuntime.spawn({
    command: "sh",
    args: ["-c", `cd /tmp && npm install ${packageName}`],
  });

  process.output.pipeTo(
    new WritableStream({
      write(data) {
        onOutput(data);
      },
    })
  );

  await process.exit;
};

export const runWorkflow = async (
  workflow: Workflow,
  onOutput: StreamHandler,
  { onChainStart, onChainComplete }: ChainLifecycleHandlers = {}
): Promise<void> => {
  const chains = buildChains(workflow);

  for (const chain of chains) {
    onChainStart?.(chain);

    try {
      const command = buildFullCommand(chain);
      const process = await webcontainerRuntime.spawn({
        command: "sh",
        args: ["-c", command],
      });

      process.output.pipeTo(
        new WritableStream({
          write(data) {
            onOutput(data);
          },
        })
      );

      await process.exit;
    } finally {
      onChainComplete?.(chain);
    }
  }
};

export const teardownRuntime = async (): Promise<void> => {
  await webcontainerRuntime.teardown();
};

export const ensureRuntimeReady = async (): Promise<void> => {
  await webcontainerRuntime.ensureInstance();
};

