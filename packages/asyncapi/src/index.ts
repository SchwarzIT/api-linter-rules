import { asyncapi } from "@stoplight/spectral-rulesets";
import { publicFlagBoolean } from "./rules/public-flag-boolean";
import { asyncapiTitleLength } from "./rules/asyncapi-title-length";
import { asyncapiVersionSupport } from "./rules/asyncapi-version-support";
import { approversValidation } from "./rules/approvers-validation";
import { applicationDomainExists } from "./rules/application-domain-exists";
import { applicationDomainNameLowercase } from "./rules/application-domain-name-lowercase";
import { applicationDomainNameLength } from "./rules/application-domain-name-length";
import { applicationDomainNameSchema } from "./rules/application-domain-name-schema";
import { messagingAppExists } from "./rules/messaging-app-exists";
import { messagingAppNameLowercase } from "./rules/messaging-app-name-lowercase";
import { messagingAppNameLength } from "./rules/messaging-app-name-length";
import { messagingAppNameSchema } from "./rules/messaging-app-name-schema";
import { channelEventHasName } from "./rules/channel-event-has-name";
import { channelEventKeyPublishValidation } from "./rules/channel-event-key-publish-validation";
import { channelEventKeySubscribeValidation } from "./rules/channel-event-key-subscribe-validation";
import { channelEventParametersAreDefinedIfSet } from "./rules/channel-event-parameters-are-defined-if-set";
import { xDefaultScopesDisabled } from "./rules/x-default-scopes-disabled";
import { xScopeProperties } from "./rules/x-scope-properties";
import { xScopeNamePattern } from "./rules/x-scope-name-pattern";
import { xScopeNameLength } from "./rules/x-scope-name-length";
import { xScopeOperationsHasOperationId } from "./rules/x-scope-operations-has-operation-id";
import { xScopeOperationsParameterRestrictionsHasValidParameter } from "./rules/x-scope-operations-parameter-restrictions-has-valid-parameter";
import { xScopeOperationsParameterRestrictionsHasEnumOrConst } from "./rules/x-scope-operations-parameter-restrictions-has-enum-or-const";
import { xScopeOperationsParameterRestrictionsConstSingleValue } from "./rules/x-scope-operations-parameter-restrictions-const-single-value";
import { xScopeApproversValidation } from "./rules/x-scope-approvers-validation";
import { xScopesDeprecatedFlagBoolean } from "./rules/x-scopes-deprecated-flag-boolean";
import { xDefaultScopesFlagBoolean } from "./rules/x-default-scopes-flag-boolean";
import { xEventNameUnique } from "./rules/x-event-name-unique";

const ruleset = {
  extends: [[asyncapi, "all"]],
  rules: {
    "public-flag-boolean": publicFlagBoolean,
    "asyncapi-title-length": asyncapiTitleLength,
    "asyncapi-version-support": asyncapiVersionSupport,
    "approvers-validation": approversValidation,
    "application-domain-exists": applicationDomainExists,
    "application-domain-name-lowercase": applicationDomainNameLowercase,
    "application-domain-name-length": applicationDomainNameLength,
    "application-domain-name-schema": applicationDomainNameSchema,
    "messaging-app-exists": messagingAppExists,
    "messaging-app-name-lowercase": messagingAppNameLowercase,
    "messaging-app-name-length": messagingAppNameLength,
    "messaging-app-name-schema": messagingAppNameSchema,
    "channel-event-has-name": channelEventHasName,
    "channel-event-key-publish-validation": channelEventKeyPublishValidation,
    "channel-event-key-subscribe-validation":
      channelEventKeySubscribeValidation,
    "channel-event-parameters-are-defined-if-set":
      channelEventParametersAreDefinedIfSet,
    "x-default-scopes-disabled": xDefaultScopesDisabled,
    "x-scope-properties": xScopeProperties,
    "x-scope-name-pattern": xScopeNamePattern,
    "x-scope-name-length": xScopeNameLength,
    "x-scope-operations-has-operation-id": xScopeOperationsHasOperationId,
    "x-scope-operations-parameter-restrictions-has-valid-parameter":
      xScopeOperationsParameterRestrictionsHasValidParameter,
    "x-scope-operations-parameter-restrictions-has-enum-or-const":
      xScopeOperationsParameterRestrictionsHasEnumOrConst,
    "x-scope-operations-parameter-restrictions-const-single-value":
      xScopeOperationsParameterRestrictionsConstSingleValue,
    "x-scope-approvers-validation": xScopeApproversValidation,
    "x-scopes-deprecated-flag-boolean": xScopesDeprecatedFlagBoolean,
    "x-default-scopes-flag-boolean": xDefaultScopesFlagBoolean,
    "x-event-name-unique": xEventNameUnique,

    // Change severity
    "asyncapi-channel-no-trailing-slash": "error",

    // Disabled Checks
    "asyncapi-info-license-url": "off",
    "asyncapi-info-license": "off",
  },
};

export default ruleset;
