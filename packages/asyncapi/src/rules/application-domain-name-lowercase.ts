import type { RuleDefinition } from '@stoplight/spectral-core';
import { pattern } from '@stoplight/spectral-functions';

export const applicationDomainNameLowercase: RuleDefinition = {
  description: "'x-application-domain' property must be lowercase",
  severity: 'error',
  given: '$.info',
  then: [
    {
      field: 'x-application-domain',
      function: pattern,
      functionOptions: {
        match: '^[a-z0-9-_]+$',
      },
    },
  ],
};
