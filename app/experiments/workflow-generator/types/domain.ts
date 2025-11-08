export type BusinessFieldType =
  | "text"
  | "number"
  | "flag"
  | "list"
  | "record"
  | "file";

export type BusinessListItemType =
  | "text"
  | "number"
  | "flag"
  | "record"
  | "file";

export type EdgeFieldRef = {
  nodeId: string;
  fieldName: string;
  type: BusinessFieldType;
  itemType?: BusinessListItemType;
};

export type EdgeLink = {
  from?: EdgeFieldRef;
  to: EdgeFieldRef;
  staticValue?: string;
};

export type EdgeMapping = {
  edgeId: string;
  links: EdgeLink[];
  notes?: string;
};

export type MatchResult =
  | { status: "ok" }
  | {
      status: "warning";
      reason:
        | "type-mismatch"
        | "list-item-mismatch"
        | "missing-upstream"
        | "missing-downstream";
    };

