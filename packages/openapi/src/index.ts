import { oas3 } from '@stoplight/spectral-formats';
import { infoDescription } from './rules/documentation/info-description';
import { contactInformation } from './rules/documentation/contact-information';
import { oas } from '@stoplight/spectral-rulesets';

const ruleset = {
  extends: [[oas, 'recommended']],
  formats: [oas3],
  rules: {
    'info-description': infoDescription,
    'contact-information': contactInformation,
  },
};

export default ruleset;
