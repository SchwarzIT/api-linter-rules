import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.ts",
      fileName: "asyncapi",
      formats: ["es"],
    },
    rollupOptions: {
      // The default spectral functions and rulesets need to be externalized and will be provided by the spectral CLI during execution
      external: [
        "@stoplight/spectral-core",
        "@stoplight/spectral-functions",
        "@stoplight/spectral-rulesets",
      ],
    },
  },
});
