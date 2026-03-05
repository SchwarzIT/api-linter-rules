import "./pre-init.ts";
import type {
  SpectralDiagnostic,
  DiagnosticSeverity,
} from "./spectral-types.js";

// The bundled SchwarzIT ruleset is imported statically
import rules from "../packages/openapi/dist/openapi.js";

let Spectral: any;
let Document: any;
let Parsers: any;

async function init() {
  if (!Spectral) {
    const core = await import("@stoplight/spectral-core");
    Spectral = core.Spectral;
    Document = core.Document;
    const parsers = await import("@stoplight/spectral-parsers");
    Parsers = parsers.default || parsers;
  }
}

let spectral: any;

async function getSpectral() {
  await init();
  if (!spectral) {
    spectral = new Spectral();
    spectral.setRuleset(rules as any);
  }
  return spectral;
}

const severityMap: Record<number, DiagnosticSeverity> = {
  0: "error",
  1: "warning",
  2: "information",
  3: "hint",
};

/**
 * Exported function targeting the Component Model WIT interface.
 * Matches: export lint: func(spec: string) -> future<list<spectral-diagnostic>>;
 */
export async function lint(inputText: string): Promise<SpectralDiagnostic[]> {
  const spectralInstance = await getSpectral();
  const myDocument = new Document(inputText, Parsers.Yaml, "/api-spec.yaml");
  const results = await spectralInstance.run(myDocument);

  // Map Spectral results to the WIT interface
  return results.map((r: any) => ({
    range: {
      start: { line: r.range.start.line, character: r.range.start.character },
      end: { line: r.range.end.line, character: r.range.end.character },
    },
    message: r.message,
    severity: severityMap[r.severity as number] || "error",
    source: r.source || undefined,
    path: r.path.map((p: string | number) =>
      typeof p === "string" ? { tag: "s", val: p } : { tag: "n", val: p },
    ),
    code:
      typeof r.code === "string"
        ? { tag: "s", val: r.code }
        : { tag: "n", val: r.code },
    tags: r.tags || undefined,
    relatedInformation:
      r.relatedInformation?.map((ri: any) => ({
        location: {
          uri: ri.location.uri || undefined,
          range: {
            start: {
              line: ri.location.range.start.line,
              character: ri.location.range.start.character,
            },
            end: {
              line: ri.location.range.end.line,
              character: ri.location.range.end.character,
            },
          },
        },
        message: ri.message,
      })) || undefined,
    documentationUrl: r.documentationUrl || undefined,
  }));
}
