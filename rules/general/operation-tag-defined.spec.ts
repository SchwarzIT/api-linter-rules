import { Spectral } from "@stoplight/spectral-core";
import ruleset from "./operation-tag-defined.yml";

describe("operation-tag-defined", () => {
  let spectral: Spectral;

  beforeEach(() => {
    spectral = setupSpectral(ruleset);
  });

  it("does not contain the operation-tag-defined error", async () => {
    const result = await spectral.run(getTestSpec());
    expect(result.find((issue) => issue.code === "operation-tag-defined")).toBeUndefined()
  });

  const getTestSpec = () =>
    JSON.stringify(
      {
        openapi: "3.0.0",
        paths: {
          "/api/v1/test": {
            get: {
              operationId: "Id",
            },
          },
        },
      },
      null,
      2
    );
});
