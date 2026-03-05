export interface Position {
  line: number;
  character: number;
}

export interface Range {
  start: Position;
  end: Position;
}

export interface Location {
  uri?: string;
  range: Range;
}

export type Segment = { tag: "s"; val: string } | { tag: "n"; val: number };

export type JsonPath = Segment[];

export type DiagnosticSeverity = "error" | "warning" | "information" | "hint";

export interface DiagnosticRelatedInformation {
  location: Location;
  message: string;
}

export type Code = { tag: "s"; val: string } | { tag: "n"; val: number };

export interface SpectralDiagnostic {
  range: Range;
  message: string;
  severity: DiagnosticSeverity;
  source?: string;
  path: JsonPath;
  code: Code;
  tags?: string[];
  relatedInformation?: DiagnosticRelatedInformation[];
  documentationUrl?: string;
}
