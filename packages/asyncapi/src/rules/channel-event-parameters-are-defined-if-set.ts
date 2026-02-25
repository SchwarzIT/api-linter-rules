import type { RuleDefinition } from "@stoplight/spectral-core";
import { parameterValidation } from "../functions/parameterValidation";

export const channelEventParametersAreDefinedIfSet: RuleDefinition = {
  description:
    "Parameters inside a event key need to be defined by a parameters object",
  message: "{{error}}",
  severity: "error",
  type: "validation",
  given: "$.channels",
  then: {
    function: parameterValidation,
  },
};
