import { Spectral } from "@stoplight/spectral-core";
import {setupSpectral} from "../../util/setup-spectral";

describe("no-http-verbs-in-resources", () => {
  let spectral: Promise<Spectral>;

  beforeEach(() => {
    spectral = setupSpectral("rules/endpoint/no-http-verbs-in-resources.yml");
  });

  it("has no errors if no http verb is used inside the path", async () => {
    const result = await spectral.then(result => {
      return (result.run(getTestSpec("/api/test")));
    });
    expect(result).toHaveLength(0);
  });

  it.each<`/${string}${"get" | "post" | "put" | "patch" | "delete"}${string}`>([
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
    const result = await spectral.then(result => {
      return (result.run(getTestSpec(path)));
    });
    expect(result).toHaveLength(1);
    expect(result[0].code).toEqual("no-http-verbs-in-resources");
  });

  const getTestSpec = (path: string) =>
    JSON.stringify({
      paths: {
        [path]: true,
      },
    });
});
