import { WebContainer, WebContainerProcess } from "@webcontainer/api";

type SpawnCommand = {
  command: string;
  args?: string[];
};

class WebcontainerRuntime {
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

export const webcontainerRuntime = new WebcontainerRuntime();

