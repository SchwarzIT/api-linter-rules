import type { RuleDefinition } from "@stoplight/spectral-core";
import { pattern } from "@stoplight/spectral-functions";

export const pathMustMatchApiStandards: RuleDefinition = {
  description: "API Path must match company API uri standards",
  message:
    "{{description}}; {{property}} incorrect. Example: /digital-twin/api/v1/products",
  severity: "error",
  resolved: false,
  given: "$.paths[?(!@property.match(/well-known/ig))]~",
  then: {
    function: pattern,
    functionOptions: {
      match: "^/([a-z-]+)/api/(v[1-9])/([a-z]+s)",
    },
  },
};
