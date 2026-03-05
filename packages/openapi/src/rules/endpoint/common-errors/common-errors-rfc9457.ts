import { RuleDefinition } from "@stoplight/spectral-core";
import { schema } from "@stoplight/spectral-functions";
import rfc9457SchemaJson from "./rfc-9457.schema.json";

/**
 * RFC-9457 Problem Details for HTTP APIs.
 */
export const rfc9457Schema = rfc9457SchemaJson;

export const commonErrorsRfc9457: RuleDefinition = {
  description: "Error responses (4xx, 5xx) must follow RFC-9457 problem details structure.",
  severity: "warn",
  given: "$.paths..responses[?(@property >= 400 && @property < 600)].content['application/json'].schema",
  then: {
    function: schema,
    functionOptions: {
      schema: rfc9457Schema,
    },
  },
};
