import type { RuleDefinition } from "@stoplight/spectral-core";
import { truthy } from "@stoplight/spectral-functions";

export const contactInformation: RuleDefinition = {
  description: "Every API must have a contact containing name, email and a url",
  message: "{{description}}; property {{property}} is missing",
  severity: "error",
  given: "$.info.contact",
  then: [
    {
      field: "name",
      function: truthy,
    },
    {
      field: "email",
      function: truthy,
    },
    {
      field: "url",
      function: truthy,
    },
  ],
};
