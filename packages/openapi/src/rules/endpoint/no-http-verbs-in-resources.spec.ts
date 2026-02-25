import { Spectral } from "@stoplight/spectral-core";
import { beforeAll, describe, expect, it } from "vitest";
import { noHttpVerbsInResources } from "./no-http-verbs-in-resources";

describe("no-http-verbs-in-resources", () => {
  let spectral: Spectral;

  beforeAll(async () => {
    spectral = new Spectral();
    spectral.setRuleset({
      rules: { "no-http-verbs-in-resources": noHttpVerbsInResources },
    });
  });

  it("has no errors if no http verb is used inside the path", async () => {
    const result = await spectral.run(getTestSpec("/api/test"));
    expect(result).toHaveLength(0);
  });

  it.each([
    "/get/",
    "/get",
    "/api/get",
    "/api/get/test",
    "/post/",
    "/post",
    "/api/post",
    "/api/post/test",
    "/put/",
    "/put",
    "/api/put",
    "/api/put/test",
    "/patch/",
    "/patch",
    "/api/patch",
    "/api/patch/test",
    "/delete/",
    "/delete",
    "/api/delete",
    "/api/delete/test",
  ])("fails if the path %s is used", async (path) => {
    const result = await spectral.run(getTestSpec(path));
    expect(result).toHaveLength(1);
    expect(result[0]?.code).toEqual("no-http-verbs-in-resources");
  });

  const getTestSpec = (path: string) => {
    return {
      paths: {
        [path]: true,
      },
    };
  };
});
