import type { RuleDefinition } from '@stoplight/spectral-core';
import { parameterRestrictionValidation } from '../functions/parameterRestrictionValidation';

export const xScopeOperationsParameterRestrictionsHasValidParameter: RuleDefinition = {
  description: 'x-scope parameter restrictions must match a parameter defined in the channel',
  message: '{{error}}',
  severity: 'error',
  type: 'validation',
  given: '$',
  then: {
    function: parameterRestrictionValidation,
  },
};
