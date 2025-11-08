/**
 * IO Mapping slice
 * ----------------
 * Keeps track of edge-level bindings between outputs and inputs.  The slice is
 * deliberately small—pure data manipulation with no React/DOM knowledge—so it
 * can be reused by both the sidebar editor and the future execution wrapper.
 *
 * Responsibilities:
 *  - Track which edge is currently selected (`activeEdgeId`).
 *  - Add/remove/update bindings for a given edge.
 *  - Provide lightweight validation (`MatchResult`) that callers can surface as warnings.
 */

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
  // Downstream missing -> the caller passed bad data; warn and bail.
  if (!to) {
    return { status: "warning", reason: "missing-downstream" };
  }

  // Allow static/default values by returning a warning that UI can visualise.
  if (!from) {
    return { status: "warning", reason: "missing-upstream" };
  }

  // Simple equality check keeps runtime cheap; coercion belongs in wrappers.
  if (from.type !== to.type) {
    return { status: "warning", reason: "type-mismatch" };
  }

  // List fields carry a secondary item type which must also match.
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
    // Compute validation result prior to mutating state so callers can surface warnings.
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
            // attach new/updated link
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
            // we store static defaults as links with `from` undefined
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
      // No need to reset activeEdgeId; UI handles deselection when appropriate.
      return { mappings: next };
    });
  },
});

