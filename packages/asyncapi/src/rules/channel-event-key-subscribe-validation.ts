import type { RuleDefinition } from "@stoplight/spectral-core";
import { subscribeValidation } from "../functions/subscribeValidation";

export const channelEventKeySubscribeValidation: RuleDefinition = {
  description: "subscribe.name does not correspond to the convention.",
  message: "{{error}}",
  type: "validation",
  severity: "error",
  given: "$",
  then: {
    function: subscribeValidation,
  },
};
