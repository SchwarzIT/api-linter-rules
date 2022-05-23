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

  it("ignores paths unde /well-known/", async () => {
    const result = await spectral.run(getTestSpec({ example: true }, "/well-known/api/something"));
    expect(result).toHaveLength(0);
  });

  const getTestSpec = (examples: { example?: boolean; examples?: boolean }, path = "/api/some/path"): string =>
    JSON.stringify(
      {
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
      },
      null,
      2
    );
});
