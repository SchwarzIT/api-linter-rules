import type { RuleDefinition } from '@stoplight/spectral-core';
import { parameterRestrictionConstTypeValidation } from '../functions/parameterRestrictionConstTypeValidation';

export const xScopeOperationsParameterRestrictionsConstSingleValue: RuleDefinition = {
  description: "'const' property must be a string or number",
  severity: 'error',
  given: '$.x-scopes[*].operations[*].parameterRestrictions[*].const',
  type: 'validation',
  then: {
    function: parameterRestrictionConstTypeValidation,
  },
};
