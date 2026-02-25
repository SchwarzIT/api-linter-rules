import type { RuleDefinition } from "@stoplight/spectral-core";
import { checkXEvent } from "../functions/checkXEvent";

export const xEventNameUnique: RuleDefinition = {
  description: "x-event-name must be unique",
  message: "{{error}}",
  severity: "error",
  given: "$",
  type: "validation",
  then: {
    function: checkXEvent,
  },
};
