# RFC-9457 Common Error Responses Validator

## Lessons Learned

### Spectral Rule Definition
- **Targeting OpenAPI Schemas**: When validating that an OpenAPI response schema follows a specific structure (like RFC-9457), the `given` path should point to the schema object (e.g., `$.paths..responses[?(@property >= 400)].content['application/json'].schema`).
- **Meta-Schema Validation**: To validate the *definition* of a schema (i.e., that it has certain properties with certain types), the idiomatic way is to use a meta-schema that describes the structure of the OpenAPI Schema Object itself.
- **Strict Constraints**: A 100% compatible RFC-9457 meta-schema (with common extensions) should enforce:
    - Proper types (`string`, `integer`, `array`).
    - Standard formats (`uri`, `int32`).
    - Length constraints (`maxLength`, `maxItems`).
    - Mandatory presence in `properties` and the `required` array.
- **Ajv as a Library**: Spectral's built-in `schema` function uses `Ajv` under the hood. Providing a well-defined meta-schema is the most robust and standard way to leverage this library for spec validation.

### JSON Schema
- **Descriptions**: Always include both short `description` and long `x-extensive-description` fields to provide context, synced with the official RFC wording.
- **Comprehensive Meta-Schema**: The meta-schema validates the *shape of the schema definition*, ensuring API designers specify all necessary constraints for their error models.

### Testing
- **Non-Interactive Mode**: Always use non-interactive mode for CI/CD and automated environments (e.g., `vitest run`).
- **OpenAPI Schema Objects**: When testing, remember that you are validating the *schema definition* in the OpenAPI document, not a runtime JSON object.

## Implementation Details
- **Rule File**: `common-errors-rfc9457.ts` - Uses the meta-schema directly.
- **Schema File**: `rfc-9457.schema.json` - Contains the strict meta-schema for RFC-9457.
- **Test File**: `common-errors-rfc9457.spec.ts` - Verifies various compliance scenarios including strict constraints.
- **Severity**: Warning
