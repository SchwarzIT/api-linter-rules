import s, { Ruleset, RulesetDefinition } from "@stoplight/spectral-core";

const init = () => {
  global.setupSpectral = setupSpectral;
};

const setupSpectral = (ruleset: Ruleset | RulesetDefinition) => {
  const spectral = new s.Spectral();
  spectral.setRuleset(ruleset);
  return spectral;
};

init();
