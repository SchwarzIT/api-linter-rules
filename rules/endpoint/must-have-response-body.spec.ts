import { Spectral } from "@stoplight/spectral-core";
import ruleset from "./must-have-response-body.yml";

describe("must-have-response-body", () => {
  let spectral: Spectral;

  beforeEach(() => {
    spectral = setupSpectral(ruleset);
  });

  it.each<[boolean, ...Parameters<typeof getTestSpec>]>([
    [true, { 200: true, 201: true }, { content: true, description: true }, "/api/some/path"],
    [false, { 200: true, 201: true }, { content: true }, "/api/some/path"],
    [false, { 200: true, 201: true }, { description: true }, "/api/some/path"],
    [false, { 200: true, 201: true }, {}, "/api/some/path"],
    [true, { 200: true }, { content: true, description: true }, "/api/some/path"],
    [true, { 201: true }, { content: true, description: true }, "/api/some/path"],
    [true, { 200: true, 201: true }, {}, "/well-known/some/path"],
  ])("fails if any of the http verbs is missing - %#", async (expectedResult, httpCodes, fields, path) => {
    const testSpec = getTestSpec(httpCodes, fields, path);
    const result = await spectral.run(testSpec);

    if (expectedResult) {
      expect(result).toHaveLength(0);
    } else {
      expect(result.length).toBeGreaterThanOrEqual(1);
      expect(result[0].code).toEqual("must-have-response-body");
    }
  });

  const getTestSpec = (
    httpCodes: { 200?: unknown; 201?: unknown },
    fields: { content?: unknown; description?: unknown },
    path: string
  ): string =>
    JSON.stringify(
      {
        paths: {
          [path]: {
            post: {
              responses: Object.keys(httpCodes).reduce((acc, code) => ({ ...acc, [code]: { ...fields } }), {}),
            },
          },
        },
      },
      null,
      2
    );
});
