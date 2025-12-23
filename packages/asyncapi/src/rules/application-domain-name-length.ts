import type { RuleDefinition } from '@stoplight/spectral-core';
import { length } from '@stoplight/spectral-functions';

export const applicationDomainNameLength: RuleDefinition = {
  description: "'x-application-domain' property max length is 24 characters",
  severity: 'error',
  given: '$.info',
  then: {
    field: 'x-application-domain',
    function: length,
    functionOptions: {
      max: 24,
    },
  },
};
