import type { RuleDefinition } from "@stoplight/spectral-core";
import { enumeration } from "@stoplight/spectral-functions";

export const publicFlagBoolean: RuleDefinition = {
  severity: "error",
  given: "$",
  then: [
    {
      field: "x-public-asyncapi",
      function: enumeration,
      functionOptions: { values: [true, false] },
    },
  ],
};
