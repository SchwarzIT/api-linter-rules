import type { RuleDefinition } from '@stoplight/spectral-core';
import { length, truthy } from '@stoplight/spectral-functions';

export const infoDescription: RuleDefinition = {
  description: 'Every API must have a global description',
  message:
    'OpenAPI objects info `description` must be present and at least 100 chars long.',
  severity: 'error',
  given: '$.info',
  then: [
    {
      field: 'description',
      function: truthy,
    },
    {
      field: 'description',
      function: length,
      functionOptions: {
        min: 100,
      },
    },
  ],
};
