import { Spectral } from "@stoplight/spectral-core";
import ruleset from "./must-have-content-type.yml";

describe("must-have-content-type", () => {
  let spectral: Spectral;

  beforeEach(() => {
    spectral = setupSpectral(ruleset);
  });

  it("has no errors if a valid content-type is defined", async () => {
    const result = await spectral.run(getTestSpec({ "application/json": true }));
    expect(result).toHaveLength(0);
  });

  it("fails if content-type is missing", async () => {
    const result = await spectral.run(getTestSpec({}));
    expect(result).toHaveLength(1);
    expect(result[0].code).toEqual("must-have-content-type");
  });

  it("fails if content-type does not match '/'", async () => {
    const result = await spectral.run(getTestSpec({"test": true}));
    expect(result).toHaveLength(1);
    expect(result[0].code).toEqual("must-have-content-type");
  });

  const getTestSpec = (content: { [key: string]: unknown }, path = "/api/some/path") =>
    JSON.stringify({
      paths: {
        [path]: {
          post: {
            requestBody: {
              content,
            },
          },
        },
      },
    });
});
