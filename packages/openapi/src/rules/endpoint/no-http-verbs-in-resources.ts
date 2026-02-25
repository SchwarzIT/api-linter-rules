import type { RuleDefinition } from "@stoplight/spectral-core";
import { pattern } from "@stoplight/spectral-functions";

export const noHttpVerbsInResources: RuleDefinition = {
  description:
    "The HTTP Verbs should not be used in the route path to define different actions on a resource",
  message:
    "{{description}}; {{property}} Instead use HTTP verbs to define actions on a resource. Example: PUT - /digital-twin/api/v1/products/42",
  severity: "error",
  given: "$.paths[?(!@property.match(/well-known/ig))]~",
  then: {
    function: pattern,
    functionOptions: {
      notMatch: "\/(get|post|put|patch|delete)(\/|$)",
    },
  },
};
