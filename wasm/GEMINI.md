# WASM Spectral Linter

This project provides a WebAssembly (WASM) component for linting OpenAPI and AsyncAPI specifications using Stoplight Spectral. It targets the WebAssembly Component Model (WASI 0.2/0.3).

## Architecture

- **`spectral-lint.ts`**: The main entry point for the linter. It uses `@stoplight/spectral-core` and bundles the SchwarzIT openapi ruleset.
- **`spectral-types.ts`**: TypeScript definitions matching the WebAssembly Interface Type (WIT) definitions.
- **`wit/`**: WebAssembly Interface Type definitions describing the component's interface.
- **`dist/spectral.wasm`**: The compiled WebAssembly component.

## Build Process

The build process is automated via `pnpm run build:wasm`. It follows these steps:

1.  **Native Build**: Builds all workspace packages (`packages/openapi`, `packages/asyncapi`).
2.  **JS Bundling**: Uses Vite to bundle `spectral-lint.ts` and its dependencies (including `spectral-core`) into a single ESM file (`wasm/dist/spectral-lint.js`).
    - Dynamic imports are used for heavy dependencies to optimize initialization.
    - Node.js built-ins like `fs` and `path` are externalized as they are provided by the WASM host environment.
3.  **Componentization**: Uses `jco componentize` to turn the JS bundle into a WASM component based on the WIT definitions.
    - Minimal WASI features are enabled (`random`, `clocks`, `stdio`).
    - `wasi:http` is explicitly disabled to ensure compatibility with standard WASM runtimes.

## Testing

Tests are located in the `wasm/test` directory and can be run via `pnpm run test:wasm`.

- **`wasm-linter.spec.ts`**: Verifies the linter by transpiling the WASM component back to JavaScript and running it directly in Vitest.
- **`wasm-oci.spec.ts`**: Verifies the linter using a local `wasmtime` installation to run the `spectral.wasm` binary with real specification files.

## Lessons Learned

### 1. Wizer Initialization and `Math.random`

During `jco componentize`, the code is pre-evaluated using Wizer. Many JavaScript libraries (or their dependencies like `brace-expansion`) call `Math.random()` at the top level for initialization. This triggers a call to `wasi:random`, which Wizer forbids during the pre-evaluation phase.
**Solution**: A `pre-init.ts` script was created to mock `Math.random` and `process` at the very beginning of the bundle, allowing the component to initialize without trapping.

### 2. Asynchronous Results (`future`)

While WIT supports `future<list<...>>` for asynchronous results, the current version of `jco` / `componentize-js` may panic during componentization when using this keyword.
**Solution**: Use a synchronous return type in WIT. `componentize-js` automatically handles `async` TypeScript functions by waiting for the promise before returning to the host, effectively providing a synchronous-looking interface from the WASM side.

### 3. Module Resolution in WASM

Top-level imports of Node.js modules like `node:fs` can cause `ReferenceError` during componentization because the environment doesn't have them yet.
**Solution**: Use dynamic `import()` within functions that need these modules, or externalize them correctly in the bundler configuration.

### 4. OCI WASM Images

Building OCI images `FROM scratch` containing only the WASM binary is possible and follows the RedHat/Podman standards for WASM workloads. However, running these images requires the host to have a correctly configured WASM runtime (like `crun` with `wasmedge` or `wasmtime` shims).
