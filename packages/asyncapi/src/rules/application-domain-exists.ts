import type { RuleDefinition } from "@stoplight/spectral-core";
import { truthy } from "@stoplight/spectral-functions";

export const applicationDomainExists: RuleDefinition = {
  description:
    "Application Domain MUST be given in the Info Object with `x-application-domain`",
  severity: "error",
  given: "$.info",
  then: {
    field: "x-application-domain",
    function: truthy,
  },
};
