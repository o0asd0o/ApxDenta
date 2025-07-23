import { defineConfig } from 'tsup';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  clean: true,
  dts: true,
  external: ['react'],
  entry: ['src/components/index.ts', 'src/hooks/index.ts', 'src/lib/index.ts'],
  format: ['cjs', 'esm'],
  minify: isProduction,
  sourcemap: true,
});
