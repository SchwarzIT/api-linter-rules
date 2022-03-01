import { Spectral } from "@stoplight/spectral-core";
import ruleset from "./path-dto-reference.yml";

describe("path-dto-reference", () => {
  let spectral: Spectral;

  beforeEach(() => {
    spectral = setupSpectral(ruleset);
  });

  it("has no errors", async () => {
    const result = await spectral.run(getTestSpec({"schema": "test"}));
    expect(result).toHaveLength(0);
  });

  it("fails no description is provided", async () => {
    const result = await spectral.run(getTestSpec({}));
    expect(result).toHaveLength(1);
    expect(result[0].code).toEqual("path-dto-reference");
  });

  const getTestSpec = (schemas: Record<string, unknown>) =>
    JSON.stringify(
      {
        components: {
          schemas
        },
      },
      null,
      2
    );
});
