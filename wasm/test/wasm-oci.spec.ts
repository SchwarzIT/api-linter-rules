import { describe, it, expect, beforeAll } from "vitest";
import { resolve } from "node:path";
import { mkdir, rm } from "node:fs/promises";
import { execSync } from "node:child_process";

describe("WASM Linter Verification", () => {
  let lint: any;

  beforeAll(async () => {
    const wasmPath = resolve(__dirname, "../dist/spectral.wasm");
    const outDir = resolve(__dirname, "../dist/transpiled-final");

    await rm(outDir, { recursive: true, force: true });
    await mkdir(outDir, { recursive: true });

    const jcoPath = resolve(__dirname, "../../node_modules/.bin/jco");
    execSync(`${jcoPath} transpile ${wasmPath} -o ${outDir}`);

    const module = await import(resolve(outDir, "spectral.js"));
    lint = module.lint;
  });

  it("should validate a correct specification", async () => {
    const specContent = `
openapi: 3.0.0
info:
  title: Valid API
  version: 1.0.0
  description: This is a sufficiently long description that should pass the linter's 100 character minimum requirement for the info description rule. It needs to be at least 100 characters long to satisfy the rule.
paths:
  /test:
    get:
      responses:
        '200':
          description: OK
`;
    const results = await lint(specContent);
    const infoDescriptionErrors = results.filter(
      (r: any) => (r.code.val || r.code) === "info-description",
    );
    expect(infoDescriptionErrors).toHaveLength(0);
  });

  it("should find errors in an invalid specification", async () => {
    const specContent = `
openapi: 3.0.0
info:
  title: Invalid API
  version: 1.0.0
  description: Too short
paths:
  /test:
    get:
      responses:
        '200':
          description: OK
`;
    const results = await lint(specContent);
    const infoDescriptionErrors = results.filter(
      (r: any) => (r.code.val || r.code) === "info-description",
    );

    expect(infoDescriptionErrors.length).toBeGreaterThan(0);
    expect(infoDescriptionErrors[0].message).toBe(
      "OpenAPI objects info `description` must be present and at least 100 chars long.",
    );
  });
});
