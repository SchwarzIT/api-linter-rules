import { Spectral } from "@stoplight/spectral-core";
import { setupSpectral } from "../../util/setup-spectral";

describe("operation-tag-defined", () => {
  let spectral: Spectral;

  beforeEach(async () => {
    spectral = await setupSpectral("rules/general/operation-tag-defined.yml");
  });

  it("does not contain the operation-tag-defined error", async () => {
    const result = await spectral.run(getTestSpec());
    expect(result.find((issue) => issue.code === "operation-tag-defined")).toBeUndefined();
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
