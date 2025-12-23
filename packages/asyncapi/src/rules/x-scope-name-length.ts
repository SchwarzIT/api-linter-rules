import type { RuleDefinition } from '@stoplight/spectral-core';
import { length } from '@stoplight/spectral-functions';

export const xScopeNameLength: RuleDefinition = {
  description: 'x-scope name max length is 50 characters',
  severity: 'error',
  given: '$.x-scopes.*',
  then: [
    {
      field: 'name',
      function: length,
      functionOptions: {
        max: 50,
      },
    },
  ],
};
