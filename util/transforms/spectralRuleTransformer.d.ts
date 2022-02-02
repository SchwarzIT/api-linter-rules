type Ruleset = import("@stoplight/spectral-core").Ruleset;
type RulesetDefinition = import("@stoplight/spectral-core").RulesetDefinition;

declare module "*.yml" {
  const data: Ruleset | RulesetDefinition;
  export default data;
}

declare module "*.yaml" {
  const data: Ruleset | RulesetDefinition;
  export default data;
}
