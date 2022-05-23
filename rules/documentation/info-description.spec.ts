import { Spectral } from "@stoplight/spectral-core";
import {setupSpectral} from "../../util/setup-spectral";

describe("info-description", () => {
  let spectral: Promise<Spectral>;

  beforeEach(() => {
    spectral = setupSpectral("rules/documentation/info-description.yml");
  });

  it("has no errors", async () => {
    const result = await spectral.then(result => {
      return (result.run(getTestSpec("#".repeat(100))));
    });
    expect(result).toHaveLength(0);
  });

  it("fails no description is provided", async () => {
    const result = await spectral.then(result => {
      return (result.run(getTestSpec(undefined)));
    });
    expect(result).toHaveLength(1);
    expect(result[0].code).toEqual("info-description");
  });

  it("fails no description is less than 100 characters long", async () => {
    const result = await spectral.then(result => {
      return (result.run(getTestSpec("#".repeat(99))));
    });
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
