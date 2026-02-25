import type { RulesetFunction } from "@stoplight/spectral-core";

const MAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const approverValidation: RulesetFunction<string | string[]> = (
  input,
) => {
  if (Array.isArray(input)) {
    for (const mail of input) {
      if (!mail.match(MAIL_REGEX)) {
        return [{ message: `${mail} is not a valid E-Mail address!` }];
      }
    }
  } else {
    return [{ message: `Approvers must be a list!` }];
  }
};
