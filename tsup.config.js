import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/converter/index.ts', 'src/dictionary/index.ts', 'src/walker/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  target: 'node20',
  sourcemap: true,
  clean: true,
});
