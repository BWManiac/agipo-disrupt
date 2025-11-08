import type { StateCreator } from "zustand";

import type {
  EdgeFieldRef,
  EdgeLink,
  EdgeMapping,
  IoMappingSlice,
  MatchResult,
  WorkflowGeneratorStore,
} from "./types";

const createFieldRef = ({
  nodeId,
  fieldName,
  type,
  itemType,
}: EdgeFieldRef): EdgeFieldRef => ({
  nodeId,
  fieldName,
  type,
  itemType,
});

const typesCompatible = (
  from?: EdgeFieldRef,
  to?: EdgeFieldRef
): MatchResult => {
  if (!to) {
    return { status: "warning", reason: "missing-downstream" };
  }

  if (!from) {
    return { status: "warning", reason: "missing-upstream" };
  }

  if (from.type !== to.type) {
    return { status: "warning", reason: "type-mismatch" };
  }

  if (from.type === "list") {
    if (from.itemType !== to.itemType) {
      return { status: "warning", reason: "list-item-mismatch" };
    }
  }

  return { status: "ok" };
};

export const createIoMappingSlice: StateCreator<
  WorkflowGeneratorStore,
  [],
  [],
  IoMappingSlice
> = (set, get) => ({
  mappings: {},
  activeEdgeId: null,

  setActiveEdge: (edgeId) => {
    set(() => ({
      activeEdgeId: edgeId,
    }));
  },

  linkFields: (edgeId, from, to) => {
    const result = typesCompatible(from, to);
    set((state) => {
      const current = state.mappings[edgeId] ?? {
        edgeId,
        links: [],
      };

      const linkIndex = current.links.findIndex(
        (link) => link.to.nodeId === to.nodeId && link.to.fieldName === to.fieldName
      );

      const updatedLink: EdgeLink = {
        ...current.links[linkIndex],
        from: from && createFieldRef(from),
        to: createFieldRef(to),
        staticValue:
          from === undefined ? current.links[linkIndex]?.staticValue ?? "" : undefined,
      };

      const nextLinks =
        linkIndex >= 0
          ? current.links.map((link, idx) =>
              idx === linkIndex ? updatedLink : link
            )
          : current.links.concat(updatedLink);

      return {
        mappings: {
          ...state.mappings,
          [edgeId]: {
            ...current,
            links: nextLinks,
          },
        },
      };
    });
    return result;
  },

  unlinkField: (edgeId, to) => {
    set((state) => {
      const current = state.mappings[edgeId];
      if (!current) return state;

      return {
        mappings: {
          ...state.mappings,
          [edgeId]: {
            ...current,
            links: current.links.filter(
              (link) =>
                !(
                  link.to.nodeId === to.nodeId && link.to.fieldName === to.fieldName
                )
            ),
          },
        },
      };
    });
  },

  setStaticValue: (edgeId, to, value) => {
    set((state) => {
      const current = state.mappings[edgeId] ?? {
        edgeId,
        links: [],
      };

      const linkIndex = current.links.findIndex(
        (link) => link.to.nodeId === to.nodeId && link.to.fieldName === to.fieldName
      );

      const updatedLink: EdgeLink = {
        ...current.links[linkIndex],
        from: undefined,
        to: createFieldRef(to),
        staticValue: value,
      };

      const nextLinks =
        linkIndex >= 0
          ? current.links.map((link, idx) =>
              idx === linkIndex ? updatedLink : link
            )
          : current.links.concat(updatedLink);

      return {
        mappings: {
          ...state.mappings,
          [edgeId]: {
            ...current,
            links: nextLinks,
          },
        },
      };
    });
  },

  removeEdgeMapping: (edgeId) => {
    set((state) => {
      if (!state.mappings[edgeId]) return state;
      const next = { ...state.mappings };
      delete next[edgeId];
      return { mappings: next };
    });
  },
});

