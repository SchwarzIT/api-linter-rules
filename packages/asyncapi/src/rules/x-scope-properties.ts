import type { RuleDefinition } from '@stoplight/spectral-core';
import { truthy } from '@stoplight/spectral-functions';

export const xScopeProperties: RuleDefinition = {
  description: 'x-scope object must have "name", "description" and "operations"',
  severity: 'error',
  given: '$.x-scopes.*',
  then: [
    { field: 'name', function: truthy },
    { field: 'description', function: truthy },
    { field: 'operations', function: truthy },
  ],
};
