import type { RuleDefinition } from '@stoplight/spectral-core';
import { pattern } from '@stoplight/spectral-functions';

export const messagingAppNameLowercase: RuleDefinition = {
  description: 'Name of messaging application MUST be lowercase',
  severity: 'error',
  given: '$.info',
  then: {
    field: 'x-messaging-application',
    function: pattern,
    functionOptions: {
      match: '^[a-z0-9-_]+$',
    },
  },
};
