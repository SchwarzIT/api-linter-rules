import { Spectral } from "@stoplight/spectral-core";
import {bundleAndLoadRuleset} from "@stoplight/spectral-ruleset-bundler/dist/loader/node";
import path from "path";
import fs from "fs";
import {fetch} from "@stoplight/spectral-runtime";

export async function setupSpectral(rulesetFile: string) {
    const spectral = new Spectral();
    spectral.setRuleset(await bundleAndLoadRuleset(path.resolve(rulesetFile), {fs, fetch}));
    return spectral;
}
