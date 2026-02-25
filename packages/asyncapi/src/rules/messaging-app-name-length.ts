import type { RuleDefinition } from "@stoplight/spectral-core";
import { length } from "@stoplight/spectral-functions";

export const messagingAppNameLength: RuleDefinition = {
  description: "'x-messaging-application' property max length is 24 characters",
  severity: "error",
  given: "$.info",
  then: {
    field: "x-messaging-application",
    function: length,
    functionOptions: {
      max: 24,
    },
  },
};
