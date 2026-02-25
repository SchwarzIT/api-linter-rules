import { beforeAll, describe, expect, it } from "vitest";
import { Spectral } from "@stoplight/spectral-core";
import { infoDescription } from "./info-description";

describe("info-description", () => {
  let spectral: Spectral;

  beforeAll(() => {
    spectral = new Spectral();
    spectral.setRuleset({ rules: { "info-description": infoDescription } });
  });

  it("has no errors", async () => {
    const result = await spectral.run({
      info: {
        description: "#".repeat(100),
      },
    });

    expect(result).toHaveLength(0);
  });

  it("fails no description is provided", async () => {
    const result = await spectral.run({ info: {} });

    expect(result).toHaveLength(1);
    expect(result[0]?.code).toEqual("info-description");
  });

  it("fails no description is less than 100 characters long", async () => {
    const result = await spectral.run({
      info: {
        description: "#".repeat(99),
      },
    });

    expect(result).toHaveLength(1);
    expect(result[0]?.code).toEqual("info-description");
  });
});
