import { CriterionBlueprintItem, GroupedBlueprint } from "../../../types";
import { Criterion } from "../criterion";
import { useQueryBuilder } from "../query-builder/use-query-builder";
import {
  CriterionGroupContext,
  CriterionGroupProvider,
} from "./use-criterion-group";

type CriterionGroupProps = {
  index: number;
  criteria: CriterionBlueprintItem[];
};

export const CriterionGroup = ({ index, criteria }: CriterionGroupProps) => {
  const { updateGroupedBlueprint } = useQueryBuilder();

  const modify: CriterionGroupContext["modify"] = (payloadOrUpdateFn) => {
    updateGroupedBlueprint((groupedBlueprint) =>
      groupedBlueprint
        .map((criteria, groupIndex) => {
          if (groupIndex === index) {
            return typeof payloadOrUpdateFn === "function"
              ? payloadOrUpdateFn(criteria)
              : payloadOrUpdateFn;
          }

          return criteria;
        })
        .filter((value): value is CriterionBlueprintItem[] => value !== null)
    );
  };

  const addCriterion: CriterionGroupContext["addCriterion"] = (payload) =>
    modify((criteria) => [...criteria, payload]);

  const updateCriterion: CriterionGroupContext["updateCriterion"] = (
    targetCriterionIndex,
    payload
  ) =>
    modify((criteria) =>
      criteria.map((criterion, criterionIndex) => {
        if (criterionIndex === targetCriterionIndex) {
          return typeof payload === "function" ? payload(criterion) : payload;
        }
        return criterion;
      })
    );

  const removeCriterion: CriterionGroupContext["removeCriterion"] = (
    targetCriterionIndex
  ) =>
    modify((criteria) => {
      const updatedCriteria = criteria.filter(
        (criterion, criterionIndex) => criterionIndex !== targetCriterionIndex
      );

      /**
       * If removing the last criteria from a group, remove the group.
       */
      if (updatedCriteria.length === 0) {
        return null;
      }

      return updatedCriteria;
    });

  const addDefaultCriterion = () => {
    addCriterion({
      type: "criterion",
      depth: 1,
      condition_id: "option",
      input: { clause: "eq" },
    });
  };

  return (
    <CriterionGroupProvider
      value={{
        index,
        criteria,
        modify,
        addCriterion,
        updateCriterion,
        removeCriterion,
      }}
    >
      <div className="bg-gray-50 p-4 mb-4 space-y-6 rounded">
        {criteria.map((criterion, index) => (
          <Criterion key={index} index={index} />
        ))}
        <button
          type="button"
          onClick={() => addDefaultCriterion()}
          className="background-transparent text-blue-600 text-xs flex items-center py-1 px-3 mt-3"
        >
          And
        </button>
      </div>
    </CriterionGroupProvider>
  );
};