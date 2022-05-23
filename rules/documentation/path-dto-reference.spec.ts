import { Spectral } from "@stoplight/spectral-core";
import {setupSpectral} from "../../util/setup-spectral";

describe("path-dto-reference", () => {
  let spectral: Promise<Spectral>;

  beforeEach(() => {
    spectral = setupSpectral("rules/documentation/path-dto-reference.yml");
  });

  it("has no errors", async () => {
    const result = await spectral.then(result => {
      return (result.run(getTestSpec({"schema": "test"})));
    });
    expect(result).toHaveLength(0);
  });

  it("fails no description is provided", async () => {
    const result = await spectral.then(result => {
      return (result.run(getTestSpec({})));
    });
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
