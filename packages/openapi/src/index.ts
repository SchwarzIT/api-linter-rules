import { oas3 } from '@stoplight/spectral-formats';
import { infoDescription } from './rules/documentation/info-description';
import { contactInformation } from './rules/documentation/contact-information';
import { commonResponsesUnauthorized } from './rules/endpoint/common-responses-unauthorized';
import { mustDefineExampleSchema } from './rules/endpoint/must-define-example-schema';
import { noHttpVerbsInResources } from './rules/endpoint/no-http-verbs-in-resources';
import { pathMustSpecifyTags } from './rules/endpoint/path-must-specify-tags';
import { oas } from '@stoplight/spectral-rulesets';

const ruleset = {
  extends: [[oas, 'recommended']],
  formats: [oas3],
  rules: {
    'info-description': infoDescription,
    'contact-information': contactInformation,
    'common-responses-unauthorized': commonResponsesUnauthorized,
    'must-define-example-schema': mustDefineExampleSchema,
    'no-http-verbs-in-resources': noHttpVerbsInResources,
    'path-must-specify-tags': pathMustSpecifyTags,
  },
};

export default ruleset;
