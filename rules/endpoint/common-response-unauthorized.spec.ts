import { Spectral } from "@stoplight/spectral-core";
import ruleset from "./common-responses-unauthorized.yml";

describe("common-responses-unauthorized", () => {
  let spectral: Spectral;

  beforeEach(() => {
    spectral = setupSpectral(ruleset);
  });

  it("has no errors if a 401 response is defined", async () => {
    const result = await spectral.run(getTestSpec({ 401: 42 }));
    expect(result).toHaveLength(0);
  });

  it.each<Parameters<typeof getTestSpec>[0]>([
    { 200: "" },
    { 404: "" },
    { 200: "", 201: "" },
    { 400: "", 200: "", 500: "" },
  ])("fails if no 401 response is defined", async (responses) => {
    const result = await spectral.run(getTestSpec(responses));
    expect(result).toHaveLength(1);
    expect(result[0].code).toEqual("common-responses-unauthorized");
  });

  const getTestSpec = (responses: Record<number, unknown>) =>
    JSON.stringify(
      {
        paths: {
          "/api/some/path": {
            get: {
              responses,
            },
          },
        },
      },
      null,
      2
    );
});
