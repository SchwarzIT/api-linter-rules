import { Spectral } from "@stoplight/spectral-core";
import ruleset from "./http-verbs-should-be-used.yml";

describe("http-verbs-should-be-used", () => {
  let spectral: Spectral;

  beforeEach(() => {
    spectral = setupSpectral(ruleset);
  });

  it("has no errors all http verbs are used", async () => {
    const result = await spectral.run(getTestSpec(["get", "post", "put", "patch", "delete"]));
    expect(result).toHaveLength(0);
  });

  it("ignores paths unde /well-known/", async () => {
    const result = await spectral.run(getTestSpec(["get"], "/well-known/api/something"));
    expect(result).toHaveLength(0);
  });

  it.each<Parameters<typeof getTestSpec>[0][]>([
    [[]],
    [["post", "put", "patch", "delete"]],
    [["get", "put", "patch", "delete"]],
    [["get", "post", "patch", "delete"]],
    [["get", "post", "put", "delete"]],
    [["get", "post", "put", "patch"]],
  ])("fails if any of the http verbs is missing", async (responses) => {
    const result = await spectral.run(getTestSpec(responses));
    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result[0].code).toEqual("http-verbs-should-be-used");
  });

  const getTestSpec = (verbs: ("get" | "post" | "put" | "patch" | "delete")[], path = "/api/some/path") =>
    JSON.stringify(
      {
        paths: {
          [path]: verbs.reduce((acc, verb) => ({ ...acc, [verb]: "Test" }), {}),
        },
      },
      null,
      2
    );
});
