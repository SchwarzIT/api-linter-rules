import { Spectral } from "@stoplight/spectral-core";
import ruleset from "./path-description-is-mandatory.yml";

describe("path-description-is-mandatory", () => {
  let spectral: Spectral;

  beforeEach(() => {
    spectral = setupSpectral(ruleset);
  });

  it("has no errors a description is provided", async () => {
    const result = await spectral.run(getTestSpec(true));
    expect(result).toHaveLength(0);
  });

  it("fails if no description is provided", async () => {
    const result = await spectral.run(getTestSpec(false));
    expect(result).toHaveLength(1);
    expect(result[0].code).toEqual("path-description-is-mandatory");
  });

  it("ignores paths under the well-known route", async () => {
    const result = await spectral.run(getTestSpec(false, "/well-known/health"));
    expect(result).toHaveLength(0);
  });

  const getTestSpec = (description: boolean, path = "/api/some/path") =>
    JSON.stringify({
      paths: {
        [path]: {
          description: description ? description : undefined
        }
      },
    });
});
