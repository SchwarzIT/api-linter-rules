import type { RuleDefinition } from "@stoplight/spectral-core";
import { checkXScopes } from "../functions/checkXScopes";

export const xDefaultScopesDisabled: RuleDefinition = {
  description:
    "When x-default-scopes are disabled you need to provide at least one custom scope",
  message: "{{error}}",
  severity: "error",
  given: "$",
  type: "validation",
  then: {
    function: checkXScopes,
  },
};
