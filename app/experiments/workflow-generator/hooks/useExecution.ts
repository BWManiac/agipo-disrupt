import { useWorkflowGeneratorStore } from "../store";

/**
 * Manages the execution flow, including running the workflow, installing
 * dependencies, and tracking the related loading states.
 */
export function useExecution() {
  const output = useWorkflowGeneratorStore((state) => state.output);
  const packageName = useWorkflowGeneratorStore((state) => state.packageName);
  const isBooting = useWorkflowGeneratorStore((state) => state.isBooting);
  const isInstalling = useWorkflowGeneratorStore((state) => state.isInstalling);
  const installDependency = useWorkflowGeneratorStore(
    (state) => state.installDependency
  );
  const runWorkflow = useWorkflowGeneratorStore((state) => state.runWorkflow);
  const setPackageName = useWorkflowGeneratorStore(
    (state) => state.setPackageName
  );

  return {
    output,
    packageName,
    isBooting,
    isInstalling,
    installDependency,
    runWorkflow,
    setPackageName,
  };
}
