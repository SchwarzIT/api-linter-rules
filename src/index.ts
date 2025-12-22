import { oas3 } from '@stoplight/spectral-formats';
import { truthy } from '@stoplight/spectral-functions';

export default {
  formats: [oas3],
  rules: {
    'api-home-get': {
      description: 'APIs root path (`/`) MUST have a GET operation.',
      message: "Otherwise people won't know how to get it.",
      given: '$.paths[/]',
      then: {
        field: 'get',
        function: truthy,
      },
      severity: 'warn',
    },
  },
};
