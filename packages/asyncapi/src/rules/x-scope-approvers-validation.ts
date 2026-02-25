import type { RuleDefinition } from "@stoplight/spectral-core";
import { approverValidation } from "../functions/approverValidation";

export const xScopeApproversValidation: RuleDefinition = {
  description: "List of approvers must contain valid E-Mail adresses !",
  message: "{{error}}",
  severity: "error",
  given: "$.x-scopes[*].approvers",
  type: "validation",
  then: {
    function: approverValidation,
  },
};
