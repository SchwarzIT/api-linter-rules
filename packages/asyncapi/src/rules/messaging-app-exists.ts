import type { RuleDefinition } from "@stoplight/spectral-core";
import { truthy } from "@stoplight/spectral-functions";

export const messagingAppExists: RuleDefinition = {
  description:
    "Messaging Application MUST be given in the Info Object with `x-messaging-application`",
  severity: "error",
  given: "$.info",
  then: {
    field: "x-messaging-application",
    function: truthy,
  },
};
