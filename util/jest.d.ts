declare function setupSpectral(
  ruleset:
    | import("@stoplight/spectral-core").Ruleset
    | import("@stoplight/spectral-core").RulesetDefinition
): import("@stoplight/spectral-core").Spectral;
