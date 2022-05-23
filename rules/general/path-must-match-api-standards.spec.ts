import { Spectral } from "@stoplight/spectral-core";
import { IRange } from "@stoplight/types/dist/parsers";
import {setupSpectral} from "../../util/setup-spectral";

describe("path-must-match-api-standards", () => {
  let spectral: Promise<Spectral>;

  beforeEach(() => {
    spectral = setupSpectral("rules/general/path-must-match-api-standards.yml");
  });

  it("has a correct path", async () => {
    const result = await spectral.then(result => {
      return (result.run(getTestSpec("/api-linting/api/v1/rules")));
    });
    expect(result).toHaveLength(0);
  });

  it("fails if the version is missing", async () => {
    const result = await spectral.then(result => {
      return (result.run(getTestSpec("/api-linting/api/rules")));
    });

    expect(result).toHaveLength(1);
    expect(result[0].code).toEqual("path-must-match-api-standards");
    expect(result[0].range).toEqual<IRange>({
      start: { line: 3, character: 33 },
      end: { line: 3, character: 36 },
    });
  });

  it.each<`${string}well-known${string}`>([
    "/well-known/",
    "well-known",
    "/api/well-known/test",
    "/well-known/api/v2",
  ])("ignores the 'well-known' routes", async (route) => {
    const result = await spectral.then(result => {
      return (result.run(getTestSpec(route)));
    });
    expect(result).toHaveLength(0);
  });

  const getTestSpec = (path: string) => `
    {
      "paths": {
        "${path}": {}
      }
    }
    `;
});
