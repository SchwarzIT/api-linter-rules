import { oas3 } from '@stoplight/spectral-formats';
import { infoDescription } from './rules/documentation/info-description';
import { oas } from '@stoplight/spectral-rulesets';

const ruleset = {
  extends: [[oas, 'recommended']],
  formats: [oas3],
  rules: {
    'info-description': infoDescription,
  },
};

export default ruleset;
