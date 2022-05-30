import { Spectral } from "@stoplight/spectral-core";
import * as YAML from "yaml";
import { setupSpectral } from "../../util/setup-spectral";

const getTestSpec = (
  httpCodes: { 200?: unknown; 201?: unknown },
  fields: { content?: unknown; description?: unknown } | { schema?: unknown; description?: unknown },
  path: string,
  version: string = "3.0.0"
) => ({
  [version.startsWith("3") ? "openapi" : "swagger"]: version,
  paths: {
    [path]: {
      get: {
        responses: Object.keys(httpCodes).reduce((acc, code) => ({ ...acc, [code]: { ...fields } }), {}),
      },
    },
  },
});

const getTestSpecJson = (
  httpCodes: { 200?: unknown; 201?: unknown },
  fields: { content?: unknown; schema?: unknown; description?: unknown },
  path: string,
  version?: string
): string => JSON.stringify(getTestSpec(httpCodes, fields, path, version), null, 2);

const getTestSpecYaml = (
  httpCodes: { 200?: unknown; 201?: unknown },
  fields: { content?: unknown; schema?: unknown; description?: unknown },
  path: string,
  version?: string
): string => YAML.stringify(getTestSpec(httpCodes, fields, path, version), null, 2);

describe.each([getTestSpecJson, getTestSpecYaml])("must-have-response-body - %p", (getTestSpec) => {
  let spectral: Spectral;

  beforeEach(async () => {
    spectral = await setupSpectral("rules/endpoint/must-have-response-body.yml");
  });

  test.each<[boolean, ...Parameters<typeof getTestSpec>]>([
    [true, { 200: true, 201: true }, { content: true, description: true }, "/api/some/path"],
    [false, { 200: true, 201: true }, { content: true }, "/api/some/path"],
    [false, { 200: true, 201: true }, { description: true }, "/api/some/path"],
    [false, { 200: true, 201: true }, {}, "/api/some/path"],
    [true, { 200: true }, { content: true, description: true }, "/api/some/path"],
    [true, { 201: true }, { content: true, description: true }, "/api/some/path"],
    [true, { 200: true, 201: true }, {}, "/well-known/some/path"],
  ])(
    "%s for the http codes %o and response content %o for path %p",
    async (expectedResult, httpCodes, fields, path) => {
      const testSpec = getTestSpec(httpCodes, fields, path);
      const result = await spectral.run(testSpec);

      if (expectedResult) {
        expect(result).toHaveLength(0);
      } else {
        expect(result.length).toBeGreaterThanOrEqual(1);
        expect(result[0].code).toEqual("must-have-response-body");
      }
    }
  );
});

describe.each([getTestSpecJson, getTestSpecYaml])("oas2-must-have-response-body - %p", (getTestSpec) => {
  let spectral: Spectral;

  beforeEach(async () => {
    spectral = await setupSpectral("rules/endpoint/must-have-response-body.yml");
  });

  test.each<[boolean, ...Parameters<typeof getTestSpec>]>([
    [true, { 200: true, 201: true }, { schema: true, description: true }, "/api/some/path"],
    [false, { 200: true, 201: true }, { schema: true }, "/api/some/path"],
    [false, { 200: true, 201: true }, { description: true }, "/api/some/path"],
    [false, { 200: true, 201: true }, {}, "/api/some/path"],
    [true, { 200: true }, { schema: true, description: true }, "/api/some/path"],
    [true, { 201: true }, { schema: true, description: true }, "/api/some/path"],
    [true, { 200: true, 201: true }, {}, "/well-known/some/path"],
  ])(
    "%s for the http codes %o and response content %o for path %p",
    async (expectedResult, httpCodes, fields, path) => {
      const testSpec = getTestSpec(httpCodes, fields, path, "2.0");
      const result = await spectral.run(testSpec);

      if (expectedResult) {
        expect(result).toHaveLength(0);
      } else {
        expect(result.length).toBeGreaterThanOrEqual(1);
        expect(result[0].code).toEqual("oas2-must-have-response-body");
      }
    }
  );
});
