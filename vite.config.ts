import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      fileName: 'api-linter-rules',
      formats: ['es'],
    },
  },
});
