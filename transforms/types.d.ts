declare module '*.yml' {
  const data: Ruleset | RulesetDefinition
  export default data
}

declare module '*.yaml' {
  const data: Ruleset | RulesetDefinition
  export default data
}