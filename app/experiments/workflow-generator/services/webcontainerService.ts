import { WebContainer, type WebContainerProcess } from "@webcontainer/api";

type SpawnCommand = {
  command: string;
  args?: string[];
};

class WebcontainerService {
  private instance: WebContainer | null = null;
  private bootPromise: Promise<WebContainer> | null = null;

  async ensureInstance(): Promise<WebContainer> {
    if (!this.bootPromise) {
      this.bootPromise = WebContainer.boot();
    }

    this.instance = await this.bootPromise;
    return this.instance;
  }

  async spawn({ command, args = [] }: SpawnCommand): Promise<WebContainerProcess> {
    const runtime = await this.ensureInstance();
    return runtime.spawn(command, args);
  }

  async teardown(): Promise<void> {
    if (this.instance) {
      await this.instance.teardown();
    }
    this.instance = null;
    this.bootPromise = null;
  }
}

const runtime = new WebcontainerService();

export const ensureRuntimeReady = () => runtime.ensureInstance();
export const spawnProcess = (command: string, args: string[] = []) =>
  runtime.spawn({ command, args });
export const teardownRuntime = () => runtime.teardown();

