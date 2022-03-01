import { Spectral } from "@stoplight/spectral-core";
import ruleset from "./info-description.yml";

describe("info-description", () => {
  let spectral: Spectral;

  beforeEach(() => {
    spectral = setupSpectral(ruleset);
  });

  it("has no errors", async () => {
    const result = await spectral.run(getTestSpec("#".repeat(100)));
    expect(result).toHaveLength(0);
  });

  it("fails no description is provided", async () => {
    const result = await spectral.run(getTestSpec(undefined));
    expect(result).toHaveLength(1);
    expect(result[0].code).toEqual("info-description");
  });

  it("fails no description is less than 100 characters long", async () => {
    const result = await spectral.run(getTestSpec("#".repeat(99)));
    expect(result).toHaveLength(1);
    expect(result[0].code).toEqual("info-description");
  });

  const getTestSpec = (description?: string) =>
    JSON.stringify(
      {
        info: {
          description,
        },
      },
      null,
      2
    );
});
