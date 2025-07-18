import { defineConfig } from 'tsup';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  clean: true,
  dts: true,
  entry: [
    'src/auth/index.ts',
    'src/db/index.ts',
    'src/lib/index.ts',
    'src/server/index.ts',
    'src/api-client.ts',
  ],
  format: ['cjs', 'esm'],
  minify: isProduction,
  sourcemap: true,
});
