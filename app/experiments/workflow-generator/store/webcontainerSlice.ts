import type { StateCreator } from "zustand";

import {
  ensureRuntimeReady,
  teardownRuntime as teardownRuntimeService,
} from "../services/webcontainerService";
import type {
  WebcontainerSlice,
  WorkflowGeneratorStore,
} from "./types";

export const createWebcontainerSlice: StateCreator<
  WorkflowGeneratorStore,
  [],
  [],
  WebcontainerSlice
> = (set, get) => ({
  isBooting: true,
  isReady: false,

  bootRuntime: async () => {
    if (get().isReady) {
      return;
    }

    set(() => ({
      isBooting: true,
    }));

    try {
      await ensureRuntimeReady();
      set(() => ({
        isReady: true,
      }));
    } finally {
      set(() => ({
        isBooting: false,
      }));
    }
  },

  teardownRuntime: async () => {
    await teardownRuntimeService();
    set(() => ({
      isReady: false,
      isBooting: false,
    }));
  },
});

