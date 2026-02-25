import type { RuleDefinition } from "@stoplight/spectral-core";
import { publishValidation } from "../functions/publishValidation";

export const channelEventKeyPublishValidation: RuleDefinition = {
  description: "publish.name does not correspond to the convention.",
  message: "{{error}}",
  severity: "error",
  type: "validation",
  given: "$",
  then: {
    function: publishValidation,
  },
};
