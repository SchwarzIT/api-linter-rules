declare module "*.yml" {
  const data: import("@stoplight/spectral-core").Ruleset | import("@stoplight/spectral-core").RulesetDefinition;
  export default data;
}

declare module "*.yaml" {
  const data: import("@stoplight/spectral-core").Ruleset | import("@stoplight/spectral-core").RulesetDefinition;
  export default data;
}
