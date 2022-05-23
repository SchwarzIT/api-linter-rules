import { Spectral } from "@stoplight/spectral-core";
import {setupSpectral} from "../../util/setup-spectral";

describe("servers-must-match-api-standards", () => {
  let spectral: Promise<Spectral>;

  beforeEach(() => {
    spectral = setupSpectral("rules/general/servers-must-match-api-standards.yml");
  });

  it("has no errors", async () => {
    const result = await spectral.then(result => {
      return (result.run(getTestSpec(["https://live.api.schwarz/digital-twin/api/v1/products"])));
    });
    expect(result).toHaveLength(0);
  });

  it.each<string[][]>([
    [["test"]],
    [["www.google.com"]],
    [["https://www.google.com"]],
    [["https://live.api.schwarz/digital-twin/api/v1/products", "error.schwarz"]],
  ])("fails if any of the server urls does not match the expected pattern", async (urls) => {
    const result = await spectral.then(result => {
      return (result.run(getTestSpec(urls)));
    });
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result[0].code).toEqual("servers-must-match-api-standards");
  });

  const getTestSpec = (urls: string[]) =>
    JSON.stringify(
      {
        servers: urls.map((url) => ({ url })),
      },
      null,
      2
    );
});
