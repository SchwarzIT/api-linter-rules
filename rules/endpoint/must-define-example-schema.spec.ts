import { Spectral } from "@stoplight/spectral-core";
import { setupSpectral } from "../../util/setup-spectral";

describe("must-define-example-schema", () => {
  let spectral: Spectral;

  beforeEach(async () => {
    spectral = await setupSpectral("rules/endpoint/must-define-example-schema.yml");
  });

  it("has no errors if just example is defined", async () => {
    const result = await spectral.run(getTestSpec({ example: true }));
    expect(result).toHaveLength(0);
  });

  it("has no errors if just examples is defined", async () => {
    const result = await spectral.run(getTestSpec({ examples: true }));
    expect(result).toHaveLength(0);
  });

  it("fails if example and examples are defined", async () => {
    const result = await spectral.run(getTestSpec({ example: true, examples: true }));
    expect(result).toHaveLength(1);
    expect(result[0].code).toEqual("must-define-example-schema");
  });

  it("fails if example and examples are undefined", async () => {
    const result = await spectral.run(getTestSpec({}));
    expect(result).toHaveLength(1);
    expect(result[0].code).toEqual("must-define-example-schema");
  });

  const getTestSpec = (examples: { example?: boolean; examples?: boolean }): string =>
    JSON.stringify(
      {
        components: {
          schemas: {
            ExampleDTO: {
              ...examples
            }
          }
        },
      },
      null,
      2
    );
});
