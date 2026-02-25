import type { RuleDefinition } from "@stoplight/spectral-core";
import { xor } from "@stoplight/spectral-functions";

export const mustDefineExampleSchema: RuleDefinition = {
  description: "Every DTO must define at least one example",
  message: "{{description}}; DTO is lacking an example {{path}}",
  severity: "error",
  given: "$.components.schemas.*",
  then: [
    {
      function: xor,
      functionOptions: {
        properties: ["example", "examples"],
      },
    },
  ],
};
