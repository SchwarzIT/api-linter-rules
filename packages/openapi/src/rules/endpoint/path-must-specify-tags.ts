import type { RuleDefinition } from '@stoplight/spectral-core';
import { length, truthy } from '@stoplight/spectral-functions';
import { oas3 } from '@stoplight/spectral-formats';

export const pathMustSpecifyTags: RuleDefinition = {
  description: 'Every route must specify at least one tag it belongs to',
  message: '{{description}}; property tags is missing at: {{path}}',
  severity: 'error',
  formats: [oas3],
  given: '$.paths[?(!@property.match(/well-known/ig))][get,post,put,delete,patch,options,head,trace]',
  then: [
    {
      field: 'tags',
      function: truthy,
    },
    {
      field: 'tags',
      function: length,
      functionOptions: {
        min: 1,
      },
    },
  ],
};
