import { Spectral } from "@stoplight/spectral-core";
import { beforeAll, describe, expect, it } from "vitest";
import { commonErrorsRfc9457 } from "./common-errors-rfc9457";

describe("common-errors-rfc9457", () => {
  let spectral: Spectral;

  beforeAll(async () => {
    spectral = new Spectral();
    spectral.setRuleset({
      rules: { "common-errors-rfc9457": commonErrorsRfc9457 },
    });
  });

  it("has no errors if error responses follow RFC-9457 with all constraints", async () => {
    const result = await spectral.run({
      paths: {
        "/api/some/path": {
          get: {
            responses: {
              400: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        detail: { type: "string", maxLength: 4096 },
                        title: { type: "string", maxLength: 1024 },
                        type: {
                          type: "string",
                          format: "uri",
                          maxLength: 1024,
                        },
                        status: {
                          type: "integer",
                          format: "int32",
                          minimum: 100,
                          maximum: 599,
                        },
                        instance: {
                          type: "string",
                          format: "uri",
                          maxLength: 1024,
                        },
                        code: { type: "string", maxLength: 50 },
                      },
                      required: ["detail"],
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    expect(result).toHaveLength(0);
  });

  it("fails if an error response (4xx) is missing maxLength on detail", async () => {
    const result = await spectral.run({
      paths: {
        "/api/some/path": {
          get: {
            responses: {
              400: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        detail: { type: "string" },
                      },
                      required: ["detail"],
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result[0]?.code).toEqual("common-errors-rfc9457");
  });

  it("fails if an error response (4xx) does not follow RFC-9457 (missing detail)", async () => {
    const result = await spectral.run({
      paths: {
        "/api/some/path": {
          get: {
            responses: {
              400: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        message: { type: "string", maxLength: 1024 },
                      },
                      required: ["message"],
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    expect(result.length).toBeGreaterThanOrEqual(1);
    expect(result[0]?.code).toEqual("common-errors-rfc9457");
  });

  it("does not check non-error responses (2xx)", async () => {
    const result = await spectral.run({
      paths: {
        "/api/some/path": {
          get: {
            responses: {
              200: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        data: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    expect(result).toHaveLength(0);
  });

  it("supports complex RFC-9457 schema with errors array and all constraints", async () => {
    const result = await spectral.run({
      paths: {
        "/api/some/path": {
          get: {
            responses: {
              422: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        detail: { type: "string", maxLength: 4096 },
                        errors: {
                          type: "array",
                          maxItems: 1000,
                          items: {
                            type: "object",
                            properties: {
                              detail: { type: "string", maxLength: 4096 },
                              pointer: { type: "string", maxLength: 1024 },
                              parameter: { type: "string", maxLength: 1024 },
                              header: { type: "string", maxLength: 1024 },
                              code: { type: "string", maxLength: 50 },
                            },
                            required: ["detail"],
                          },
                          required: ["detail"],
                        },
                      },
                      required: ["detail"],
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    expect(result).toHaveLength(0);
  });

  it("fails if error fields have wrong types or missing constraints", async () => {
    const result = await spectral.run({
      paths: {
        "/api/some/path": {
          get: {
            responses: {
              400: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        detail: { type: "integer" },
                      },
                      required: ["detail"],
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it("fails if status field is present but missing constraints", async () => {
    const result = await spectral.run({
      paths: {
        "/api/some/path": {
          get: {
            responses: {
              500: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        detail: { type: "string", maxLength: 4096 },
                        status: { type: "integer" }, // Missing format, minimum, maximum
                      },
                      required: ["detail"],
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it("fails if instance field is present but has wrong format", async () => {
    const result = await spectral.run({
      paths: {
        "/api/some/path": {
          get: {
            responses: {
              400: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        detail: { type: "string", maxLength: 4096 },
                        instance: { type: "string", maxLength: 1024 }, // Missing format: uri
                      },
                      required: ["detail"],
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it("fails if code field is present but has wrong maxLength", async () => {
    const result = await spectral.run({
      paths: {
        "/api/some/path": {
          get: {
            responses: {
              400: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        detail: { type: "string", maxLength: 4096 },
                        code: { type: "string", maxLength: 100 }, // Wrong maxLength: 50
                      },
                      required: ["detail"],
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it("fails if errors property is missing maxItems", async () => {
    const result = await spectral.run({
      paths: {
        "/api/some/path": {
          get: {
            responses: {
              422: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        detail: { type: "string", maxLength: 4096 },
                        errors: {
                          type: "array",
                          items: {
                            type: "object",
                            properties: {
                              detail: { type: "string", maxLength: 4096 },
                            },
                            required: ["detail"],
                          },
                          required: ["detail"],
                        },
                      },
                      required: ["detail"],
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it("fails if errors item is missing required detail in its required array", async () => {
    const result = await spectral.run({
      paths: {
        "/api/some/path": {
          get: {
            responses: {
              422: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        detail: { type: "string", maxLength: 4096 },
                        errors: {
                          type: "array",
                          maxItems: 1000,
                          items: {
                            type: "object",
                            properties: {
                              detail: { type: "string", maxLength: 4096 },
                            },
                            required: [], // Missing detail
                          },
                          required: ["detail"],
                        },
                      },
                      required: ["detail"],
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it("fails if detail is not marked as required", async () => {
    const result = await spectral.run({
      paths: {
        "/api/some/path": {
          get: {
            responses: {
              400: {
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: {
                        detail: { type: "string", maxLength: 4096 },
                      },
                      required: [], // Missing detail
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    expect(result.length).toBeGreaterThanOrEqual(1);
  });
});
