import { Spectral } from "@stoplight/spectral-core";
import { setupSpectral } from "../../util/setup-spectral";

describe("path-description-is-mandatory", () => {
  let spectral: Spectral;

  beforeEach(async () => {
    spectral = await setupSpectral("rules/endpoint/path-description-is-mandatory.yml");
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
      openapi: '3.0',
      paths: {
        [path]: {
          description: description ? description : undefined,
        },
      },
    });
});
