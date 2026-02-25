export const parameterRestrictionValidation = (input: any) => {
  if ("x-scopes" in input) {
    let uniqueNames: any[] = [];
    for (const [, value] of Object.entries(input["x-scopes"] as any)) {
      // x-scopes names must be unique
      if (uniqueNames.includes((value as any)["name"])) {
        return [
          {
            message: `x-scope.name:${
              (value as any)["name"]
            } must be unique in x-scopes`,
          },
        ];
      }
      uniqueNames.push((value as any)["name"]);

      if ("operations" in (value as any)) {
        let uniqueOpIds: any[] = [];
        for (const [, v] of Object.entries((value as any)["operations"])) {
          // Check if operationId exists in channels
          if ("operationId" in (v as any)) {
            let exists = false;
            // Check if operationId exists in channels
            for (const [ck, cv] of Object.entries(input["channels"] as any)) {
              if ("subscribe" in (cv as any)) {
                if (
                  (cv as any)["subscribe"]["operationId"] ==
                  (v as any)["operationId"]
                ) {
                  exists = true;
                  // Check if ParameterRestrictions exists in channels
                  if ("parameterRestrictions" in (v as any)) {
                    for (const [k1] of Object.entries(
                      (v as any)["parameterRestrictions"],
                    )) {
                      if (!ck.includes("{" + k1 + "}")) {
                        return [
                          {
                            message: `x-scope.operations.parameterRestrictions.${k1} is not defined in channel: ${ck}`,
                          },
                        ];
                      }
                    }
                  }
                }
              }
              if ("publish" in (cv as any)) {
                if (
                  (cv as any)["publish"]["operationId"] ==
                  (v as any)["operationId"]
                ) {
                  exists = true;
                  if ("parameterRestrictions" in (v as any)) {
                    for (const [k1] of Object.entries(
                      (v as any)["parameterRestrictions"],
                    )) {
                      if (!ck.includes("{" + k1 + "}")) {
                        return [
                          {
                            message: `x-scope.operations.parameterRestrictions.${k1} is not defined in channel: ${ck}`,
                          },
                        ];
                      }
                    }
                  }
                }
              }
            }
            // OperationId must be unqiue in a scope
            if (uniqueOpIds.includes((v as any)["operationId"])) {
              return [
                {
                  message: `x-scope.operations.operationId:${
                    (v as any)["operationId"]
                  } must be unique in x-scope.operations`,
                },
              ];
            }
            uniqueOpIds.push((v as any)["operationId"]);

            if (!exists) {
              return [
                {
                  message: `x-scope.operations.operationId: ${
                    (v as any)["operationId"]
                  } must exist in channels.subcribe|publish.operationId`,
                },
              ];
            }
          }
        }
      }
    }
  }
};
