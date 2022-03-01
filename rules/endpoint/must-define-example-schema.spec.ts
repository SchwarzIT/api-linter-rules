import { Spectral } from "@stoplight/spectral-core";
import ruleset from "./must-define-example-schema.yml";

describe("must-define-example-schema", () => {
  let spectral: Spectral;

  beforeEach(() => {
    spectral = setupSpectral(ruleset);
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

  it("ignores paths unde /well-known/", async () => {
    const result = await spectral.run(getTestSpec({ example: true }, "/well-known/api/something"));
    expect(result).toHaveLength(0);
  });

  const getTestSpec = (examples: { example?: boolean; examples?: boolean }, path = "/api/some/path") => ({
    paths: {
      [path]: {
        post: {
          responses: {
            "201": {
              content: {
                "application/json": {
                  ...examples,
                },
              },
            },
            "400": {
              description: "",
            },
          },
        },
      },
    },
  });
});
