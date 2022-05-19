import { Spectral } from "@stoplight/spectral-core";
import ruleset from "./must-have-path.yml";

describe("must-have-path", () => {
  let spectral: Spectral;

  beforeEach(() => {
    spectral = setupSpectral(ruleset);
  });

  it("has no errors", async () => {
    const result = await spectral.run(getTestSpec({ path: 42 }));
    expect(result).toHaveLength(0);
  });

  it("fails if no paths are provided", async () => {
    const result = await spectral.run(getTestSpec({}));
    expect(result).toHaveLength(1);
    expect(result[0].code).toEqual("must-have-path");
    expect(result[0].message).toContain("`paths` is empty");
  });

  const getTestSpec = (paths: Record<string, unknown>) =>
    JSON.stringify(
      {
        paths,
      },
      null,
      2
    );
});
