import type { RuleDefinition } from "@stoplight/spectral-core";
import { enumeration } from "@stoplight/spectral-functions";

export const xScopesDeprecatedFlagBoolean: RuleDefinition = {
  description: "deprecated field can either be true or false.",
  severity: "error",
  given: "$.x-scopes[*].deprecated",
  then: {
    field: "deprecated",
    function: enumeration,
    functionOptions: {
      values: [false, true],
    },
  },
};
