import type { RuleDefinition } from "@stoplight/spectral-core";
import { truthy, enumeration } from "@stoplight/spectral-functions";

export const asyncapiVersionSupport: RuleDefinition = {
  description: "Supported AsyncAPI versions: 2.5.0, 2.6.0",
  severity: "error",
  given: "$",
  then: [
    { field: "asyncapi", function: truthy },
    {
      field: "asyncapi",
      function: enumeration,
      functionOptions: {
        values: ["2.5.0", "2.6.0"],
      },
    },
  ],
};
