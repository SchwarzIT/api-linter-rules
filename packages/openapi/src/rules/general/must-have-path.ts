import type { RuleDefinition } from "@stoplight/spectral-core";
import { length } from "@stoplight/spectral-functions";

export const mustHavePath: RuleDefinition = {
  description: "Every API must have at least one path",
  message: "{{description}}; property `paths` is empty",
  severity: "error",
  given: "$",
  then: [
    {
      field: "paths",
      function: length,
      functionOptions: {
        min: 1,
      },
    },
  ],
};
