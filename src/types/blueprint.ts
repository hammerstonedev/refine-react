interface BaseBlueprintItem {
  depth: number;
  type: string;
}

export interface CriterionBlueprintItem extends BaseBlueprintItem {
  type: "criterion";
  condition_id: string;
  input: {
    clause: string;
    value?: string;
  };
}

export interface ConjunctionBlueprintItem extends BaseBlueprintItem {
  type: "conjunction";
  word: "and" | "or";
}

export type BlueprintItem = CriterionBlueprintItem | ConjunctionBlueprintItem;

export type Blueprint = BlueprintItem[];

export type GroupedBlueprint = CriterionBlueprintItem[][];