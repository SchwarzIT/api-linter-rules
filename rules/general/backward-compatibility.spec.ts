import { Spectral, Document } from "@stoplight/spectral-core";
import { Json } from "@stoplight/spectral-parsers";
import { setupSpectral } from "../../util/setup-spectral";

// Mocking simple-git
const mockShow = jest.fn();
const mockLog = jest.fn();
const mockRevParse = jest.fn();

jest.mock("simple-git", () => ({
  simpleGit: () => ({
    show: mockShow,
    log: mockLog,
    revparse: mockRevParse,
  }),
}));

describe("backward-compatibility", () => {
  let spectral: Spectral;

  beforeEach(async () => {
    spectral = await setupSpectral("rules/general/backward-compatibility.yml");
    mockShow.mockReset();
    mockLog.mockReset();
    mockRevParse.mockReset();
    mockRevParse.mockResolvedValue("/repo-root");
  });

  it("passes if no previous version exists", async () => {
    mockLog.mockResolvedValue({ total: 1 });

    const doc = new Document(JSON.stringify({
      openapi: "3.0.0",
      info: { title: "Test", version: "1.0.0" },
      paths: {},
    }), Json, "test.json");

    const result = await spectral.run(doc);
    expect(result).toHaveLength(0);
  });

  it("fails if not backwards compatible (deleted path)", async () => {
    mockLog.mockResolvedValue({ total: 2 });
    mockShow.mockResolvedValue(
      JSON.stringify({
        openapi: "3.0.0",
        info: { title: "Test", version: "1.0.0" },
        paths: { "/old": { get: {} } },
      })
    );

    const doc = new Document(JSON.stringify({
      openapi: "3.0.0",
      info: { title: "Test", version: "1.0.0" },
      paths: { "/new": { get: {} } },
    }), Json, "test.json");

    const result = await spectral.run(doc);
    expect(result).toHaveLength(1);
    expect(result[0].message).toContain("Breaking change: Path /old was removed.");
  });

  it("passes if version is bumped", async () => {
    mockLog.mockResolvedValue({ total: 2 });
    mockShow.mockResolvedValue(
      JSON.stringify({
        openapi: "3.0.0",
        info: { title: "Test", version: "1.0.0" },
        paths: { "/old": { get: {} } },
      })
    );

    const doc = new Document(JSON.stringify({
      openapi: "3.0.0",
      info: { title: "Test", version: "1.1.0" }, // Minor bump
      paths: { "/new": { get: {} } }, // Breaking change allowed because of bump
    }), Json, "test.json");

    const result = await spectral.run(doc);
    expect(result).toHaveLength(0);
  });
});
