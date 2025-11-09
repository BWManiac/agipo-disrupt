import { useWorkflowGeneratorStore } from "../store";

/**
 * Manages the execution state of the workflow, including running code,
 * installing dependencies, and now, saving the workflow.
 */
export function useExecution() {
  const output = useWorkflowGeneratorStore((state) => state.output);
  const isBooting = useWorkflowGeneratorStore((state) => state.isBooting);
  const isInstalling = useWorkflowGeneratorStore((state) => state.isInstalling);
  const packageName = useWorkflowGeneratorStore((state) => state.packageName);
  const installDependency = useWorkflowGeneratorStore(
    (state) => state.installDependency
  );
  const runWorkflow = useWorkflowGeneratorStore((state) => state.runWorkflow);
  const setPackageName = useWorkflowGeneratorStore(
    (state) => state.setPackageName
  );

  // New state and actions for saving
  const isSaving = useWorkflowGeneratorStore((state) => state.isSaving);
  const saveCurrentWorkflow = useWorkflowGeneratorStore(
    (state) => state.saveCurrentWorkflow
  );
  const setWorkflowName = useWorkflowGeneratorStore(
    (state) => state.setWorkflowName
  );

  return {
    output,
    isBooting,
    isInstalling,
    packageName,
    installDependency,
    runWorkflow,
    setPackageName,
    isSaving,
    saveCurrentWorkflow,
    setWorkflowName,
  };
}
