import type { RuleDefinition } from "@stoplight/spectral-core";
import { truthy } from "@stoplight/spectral-functions";

export const channelEventHasName: RuleDefinition = {
  description: "channel.<event> has a field called x-event-name",
  severity: "error",
  given: "$.channels.*",
  then: {
    field: "x-event-name",
    function: truthy,
  },
};
