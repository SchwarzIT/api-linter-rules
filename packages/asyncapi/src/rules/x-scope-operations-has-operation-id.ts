import type { RuleDefinition } from '@stoplight/spectral-core';
import { truthy } from '@stoplight/spectral-functions';

export const xScopeOperationsHasOperationId: RuleDefinition = {
  description: 'x-scope.operations object must have operationId',
  severity: 'error',
  given: '$.x-scopes[*].operations.*',
  then: {
    field: 'operationId',
    function: truthy,
  },
};
