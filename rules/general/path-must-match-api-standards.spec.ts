import s from "@stoplight/spectral-core";
import ruleset from "./path-must-match-api-standards.yml";

describe("path-must-match-api-standards", () => {
  it("lints", async () => {
    const spectral = new s.Spectral();
    spectral.setRuleset(ruleset)
    const result = await spectral.run(`
      {
        "paths": {
          "/api-linting/api/v1/rules": {
              "get": {
                  "operationId": "RulesController_getCompanyApiRules",
                  "summary": "",
                  "description": "Get company API linting rules for Spectral as YAML.",
                  "parameters": [
                      {
                          "name": "apiType",
                          "required": true,
                          "in": "query",
                          "allowEmptyValue": false,
                          "schema": {
                              "enum": [
                                  "backend_for_frontend",
                                  "legacy_api",
                                  "product_api"
                              ],
                              "type": "string"
                          }
                      }
                  ],
                  "responses": {
                      "201": {
                          "description": "Provides company API linting rules as stream download."
                      },
                      "400": {
                          "description": "\"apiType\" query param is missing."
                      },
                      "401": {
                          "description": "API call was not authenticated"
                      }
                  },
                  "security": [
                      {
                          "basic": []
                      }
                  ],
                  "tags": [
                      "rules",
                  ]
              }
          }
        }
      }
    `);

    console.log(result);
    
    expect(result).toHaveLength(1);
  });
});
