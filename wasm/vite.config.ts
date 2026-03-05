import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    lib: {
      entry: resolve(__dirname, "spectral-lint.ts"),
      name: "spectral-linter",
      fileName: "spectral-lint",
      formats: ["es"],
    },
    outDir: "dist",
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
      // Externalize wasi: and node: imports as they are provided by the component host
      external: [/^wasi:/, /^spectral:/, /^node:fs/, /^node:process/],
    },
  },
});
