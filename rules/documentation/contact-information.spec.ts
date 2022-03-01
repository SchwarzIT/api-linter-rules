import { Spectral } from "@stoplight/spectral-core";
import { IRange } from "@stoplight/types/dist/parsers";
import ruleset from "./contact-information.yml";

describe("contact-information", () => {
  let spectral: Spectral;

  beforeEach(() => {
    spectral = setupSpectral(ruleset);
  });

  it("has no errors", async () => {
    const result = await spectral.run(getTestSpec("name", "email", "url"));
    expect(result).toHaveLength(0);
  });

  it("is missing the required property name", async () => {
    const result = await spectral.run(getTestSpec(undefined, "email", "url"));
    expect(result).toHaveLength(1);
    expect(result[0].code).toEqual("contact-information");
    expect(result[0].message).toContain("name is missing");
  });

  it("is missing the required property email", async () => {
    const result = await spectral.run(getTestSpec("name", undefined, "url"));
    expect(result).toHaveLength(1);
    expect(result[0].code).toEqual("contact-information");
    expect(result[0].message).toContain("email is missing");
  });

  it("is missing the required property url", async () => {
    const result = await spectral.run(getTestSpec("name", "email", undefined));
    expect(result).toHaveLength(1);
    expect(result[0].code).toEqual("contact-information");
    expect(result[0].message).toContain("url is missing");
  });

  const getTestSpec = (name?: string, email?: string, url?: string) =>
    JSON.stringify(
      {
        info: {
          contact: {
            name,
            email,
            url,
          },
        },
      },
      null,
      2
    );
});
