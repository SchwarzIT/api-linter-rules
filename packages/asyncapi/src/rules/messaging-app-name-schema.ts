import type { RuleDefinition } from "@stoplight/spectral-core";
import { schema } from "@stoplight/spectral-functions";

export const messagingAppNameSchema: RuleDefinition = {
  description: "'x-messaging-application' property must be a string",
  severity: "error",
  given: "$.info",
  then: [
    {
      field: "x-messaging-application",
      function: schema,
      functionOptions: {
        schema: {
          type: "string",
        },
      },
    },
  ],
};
