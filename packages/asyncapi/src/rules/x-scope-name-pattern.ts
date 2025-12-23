import type { RuleDefinition } from '@stoplight/spectral-core';
import { pattern } from '@stoplight/spectral-functions';

export const xScopeNamePattern: RuleDefinition = {
  description: 'x-scope name must be of allowed pattern [a-z0-9\-]',
  severity: 'error',
  given: '$.x-scopes.*',
  then: [
    {
      field: 'name',
      function: pattern,
      functionOptions: {
        match: '^[a-z0-9\-]*$',
      },
    },
  ],
};
