import { oas3 } from "@stoplight/spectral-formats";
import { infoDescription } from "./rules/documentation/info-description";
import { contactInformation } from "./rules/documentation/contact-information";
import { commonResponsesUnauthorized } from "./rules/endpoint/common-responses-unauthorized";
import { commonErrorsRfc9457 } from "./rules/endpoint/common-errors/common-errors-rfc9457";
import { mustDefineExampleSchema } from "./rules/endpoint/must-define-example-schema";
import { noHttpVerbsInResources } from "./rules/endpoint/no-http-verbs-in-resources";
import { pathMustSpecifyTags } from "./rules/endpoint/path-must-specify-tags";
import { mustHavePath } from "./rules/general/must-have-path";
import { oas } from "@stoplight/spectral-rulesets";

const ruleset = {
  extends: [[oas, "recommended"]],
  formats: [oas3],
  rules: {
    "info-description": infoDescription,
    "contact-information": contactInformation,
    "common-responses-unauthorized": commonResponsesUnauthorized,
    "common-errors-rfc9457": commonErrorsRfc9457,
    "must-define-example-schema": mustDefineExampleSchema,
    "no-http-verbs-in-resources": noHttpVerbsInResources,
    "path-must-specify-tags": pathMustSpecifyTags,
    "must-have-path": mustHavePath,
    // 'path-must-match-api-standards': pathMustMatchApiStandards, // Rule is still under discussion and therefor disabled
    // 'servers-must-match-api-standards': serversMustMatchApiStandards, // Rule is still under discussion and therefor disabled
    "operation-tag-defined": "off",
  },
};

export default ruleset;
