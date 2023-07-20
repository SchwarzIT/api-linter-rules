import { Spectral } from "@stoplight/spectral-core";
import { bundleAndLoadRuleset } from "@stoplight/spectral-ruleset-bundler/with-loader";
import path from "path";
import fs from "fs";
import { fetch } from "@stoplight/spectral-runtime";

export async function setupSpectral(rulesetFile: string) {
  const spectral = new Spectral();
  const ruleset = await bundleAndLoadRuleset(path.resolve(rulesetFile), { fs, fetch });
  spectral.setRuleset(ruleset);
  return spectral;
}
