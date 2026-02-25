import type { RuleDefinition } from "@stoplight/spectral-core";
import { truthy } from "@stoplight/spectral-functions";

export const commonResponsesUnauthorized: RuleDefinition = {
  description: "Responses should contain common response - 401 (unauthorized)",
  message: "{{description}}. Missing {{property}}",
  severity: "error",
  given: "$.paths[?(!@property.match(/well-known/ig))]..responses",
  then: [
    {
      field: "401",
      function: truthy,
    },
  ],
};
