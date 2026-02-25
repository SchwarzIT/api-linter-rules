export const checkXScopes = (input: any) => {
  if ("x-default-scopes" in input) {
    if (!input["x-default-scopes"]) {
      if (!("x-scopes" in input)) {
        return [
          {
            message: `When x-default-scopes are disabled (false) you need to provide at least one custom x-scope`,
          },
        ];
      }
    }
  }
};
