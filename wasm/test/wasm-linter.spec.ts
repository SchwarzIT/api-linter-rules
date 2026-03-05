import { describe, it, expect, beforeAll } from "vitest";
import { rm, mkdir } from "node:fs/promises";
import { resolve } from "node:path";
import { execSync } from "node:child_process";

describe("WASM Linter", () => {
  let lint: any;

  beforeAll(async () => {
    const wasmPath = resolve(__dirname, "../dist/spectral.wasm");
    const outDir = resolve(__dirname, "../dist/transpiled-linter");

    await rm(outDir, { recursive: true, force: true });
    await mkdir(outDir, { recursive: true });

    const jcoPath = resolve(__dirname, "../../node_modules/.bin/jco");
    execSync(`${jcoPath} transpile ${wasmPath} -o ${outDir}`);

    const module = await import(resolve(outDir, "spectral.js"));
    lint = module.lint;
  });

  const validSpec = `
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

  const invalidSpec = `
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

  it("should return no diagnostics for a valid specification", async () => {
    const results = await lint(validSpec);
    const infoDescriptionErrors = results.filter(
      (r: any) => (r.code.val || r.code) === "info-description",
    );
    expect(infoDescriptionErrors).toHaveLength(0);
  });

  it("should return diagnostics for an invalid specification (short description)", async () => {
    const results = await lint(invalidSpec);
    const infoDescriptionErrors = results.filter(
      (r: any) => (r.code.val || r.code) === "info-description",
    );

    expect(infoDescriptionErrors.length).toBeGreaterThan(0);
    expect(infoDescriptionErrors[0].message).toBe(
      "OpenAPI objects info `description` must be present and at least 100 chars long.",
    );
    expect(infoDescriptionErrors[0].severity).toBe("error");
  });
});
