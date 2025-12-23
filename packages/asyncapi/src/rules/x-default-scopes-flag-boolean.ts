import type { RuleDefinition } from '@stoplight/spectral-core';
import { enumeration } from '@stoplight/spectral-functions';

export const xDefaultScopesFlagBoolean: RuleDefinition = {
  severity: 'error',
  given: '$',
  then: {
    field: 'x-default-scopes',
    function: enumeration,
    functionOptions: {
      values: [false, true],
    },
  },
};
