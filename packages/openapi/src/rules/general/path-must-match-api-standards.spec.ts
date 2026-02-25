import { Spectral } from "@stoplight/spectral-core";
import { beforeAll, describe, expect, it } from "vitest";
import { pathMustMatchApiStandards } from "./path-must-match-api-standards";

describe("path-must-match-api-standards", () => {
  let spectral: Spectral;

  beforeAll(async () => {
    spectral = new Spectral();
    spectral.setRuleset({
      rules: { "path-must-match-api-standards": pathMustMatchApiStandards },
    });
  });

  it("has a correct path", async () => {
    const result = await spectral.run(getTestSpec("/api-linting/api/v1/rules"));
    expect(result).toHaveLength(0);
  });

  it("fails if the version is missing", async () => {
    const result = await spectral.run(getTestSpec("/api-linting/api/rules"));

    expect(result).toHaveLength(1);
    expect(result[0]?.code).toEqual("path-must-match-api-standards");
  });

  it.each([
    "/well-known/",
    "well-known",
    "/api/well-known/test",
    "/well-known/api/v2",
  ])("ignores the 'well-known' routes", async (route) => {
    const result = await spectral.run(getTestSpec(route));
    expect(result).toHaveLength(0);
  });

  const getTestSpec = (path: string) => {
    return {
      paths: {
        [path]: {},
      },
    };
  };
});
