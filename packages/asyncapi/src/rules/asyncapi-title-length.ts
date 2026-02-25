import type { RuleDefinition } from "@stoplight/spectral-core";
import { length } from "@stoplight/spectral-functions";

export const asyncapiTitleLength: RuleDefinition = {
  message: "AsyncAPI title max length is 80 characters",
  severity: "error",
  given: "$.info.title",
  then: {
    function: length,
    functionOptions: {
      max: 80,
    },
  },
};
