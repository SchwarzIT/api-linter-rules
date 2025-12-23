import type { RuleDefinition } from '@stoplight/spectral-core';
import { schema } from '@stoplight/spectral-functions';

export const applicationDomainNameSchema: RuleDefinition = {
  description: "'x-application-domain' property must be a string",
  severity: 'error',
  given: '$.info',
  then: [
    {
      field: 'x-application-domain',
      function: schema,
      functionOptions: {
        schema: {
          type: 'string',
        },
      },
    },
  ],
};
