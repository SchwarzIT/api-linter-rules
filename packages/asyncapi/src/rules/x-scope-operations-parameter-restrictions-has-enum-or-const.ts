import type { RuleDefinition } from "@stoplight/spectral-core";
import { xor } from "@stoplight/spectral-functions";

export const xScopeOperationsParameterRestrictionsHasEnumOrConst: RuleDefinition =
  {
    description:
      "x-scope.operations.parameterRestrictions.<parameter> object must have enum or const",
    severity: "error",
    given: "$.x-scopes[*].operations[*].parameterRestrictions.*",
    then: {
      function: xor,
      functionOptions: {
        properties: ["enum", "const"],
      },
    },
  };
