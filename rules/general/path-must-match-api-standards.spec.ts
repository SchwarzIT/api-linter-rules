import { Spectral } from "@stoplight/spectral-core";
import test from './path-must-match-api-standards.yml'

describe("path-must-match-api-standards", () => {
  it("test", () => {
    const spectral = new Spectral();
    expect(test).toBe("");
  });
});
