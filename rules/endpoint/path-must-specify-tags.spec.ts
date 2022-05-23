import { Spectral } from "@stoplight/spectral-core";
import {setupSpectral} from "../../util/setup-spectral";

describe("path-must-specify-tags", () => {
  let spectral: Promise<Spectral>;

  beforeEach(() => {
    spectral = setupSpectral("rules/endpoint/path-must-specify-tags.yml");
  });

  it("has no errors if tags are provided", async () => {
    const result = await spectral.then(result => {
      return (result.run(getTestSpec(["tag"])));
    });
    expect(result).toHaveLength(0);
  });

  it("fails if no tags were provided", async () => {
    const result = await spectral.then(result => {
      return (result.run(getTestSpec()));
    });
    expect(result).toHaveLength(1);
    expect(result[0].code).toEqual("path-must-specify-tags");
  });

  it("fails if the number of tag is less than 1", async () => {
    const result = await spectral.then(result => {
      return (result.run(getTestSpec([])));
    });
    expect(result).toHaveLength(1);
    expect(result[0].code).toEqual("path-must-specify-tags");
  });

  it("ignores paths under the well-known route", async () => {
    const result = await spectral.then(result => {
      return (result.run(getTestSpec(undefined, "/well-known/health")));
    });
    expect(result).toHaveLength(0);
  });

  const getTestSpec = (tags?: string[], path = "/api/some/path") =>
    JSON.stringify({
      paths: {
        [path]: {
          post: {
            tags,
          },
        },
      },
    });
});
