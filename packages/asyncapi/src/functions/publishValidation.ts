const REGEXP_PATTERN =
  "^(?<domain>[a-z0-9_-]+)/(?<type>t)/(?<division>([a-z]{3})|({[a-z]+}))/(?<app>[a-z0-9_-]+).*$";

export const publishValidation = (input: any) => {
  for (const [key, value] of Object.entries(input["channels"] as any)) {
    if ("publish" in (value as any)) {
      let match = key.match(REGEXP_PATTERN);

      if (match && match.groups) {
        const groups = match.groups;
        //Domain
        if (groups.domain != input.info["x-application-domain"]) {
          return [
            {
              message: `publish access not allowed for ${key}. domain: ${groups.domain} must match ${
                input.info["x-application-domain"]
              }`,
            },
          ];
        }
        //Messaging App
        if (groups.app != input.info["x-messaging-application"]) {
          return [
            {
              message: `publish access not allowed for ${key}. app: ${groups.app} must match ${
                input.info["x-messaging-application"]
              }`,
            },
          ];
        }
        if (groups.type != "t" && groups.type != "q") {
          return [
            {
              message: `publish access wrong name for ${key}.`,
            },
          ];
        }
      } else {
        return [
          {
            message: `Wrong pattern for channel ${key}. Should be <domain>/t/<division>/<messagingapp>`,
          },
        ];
      }
    }
  }
};
