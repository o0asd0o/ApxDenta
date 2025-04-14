import { defineConfig } from 'tsup';

const isProduction = process.env.NODE_ENV === 'production';

/**
 * "./auth": {
      "types": "./dist/src/auth/index.d.ts",
      "default": "./src/auth/index.ts"
    },
    "./db": {
      "types": "./dist/src/db/index.d.ts",
      "default": "./src/db/index.ts"
    },
    "./lib": {
      "types": "./dist/src/lib/index.d.ts",
      "default": "./src/lib/index.ts"
    },
    "./server": {
      "types": "./dist/src/server/index.d.ts",
      "default": "./src/server/index.ts"
    },
    "./client": {
      "types": "./dist/src/api-client.d.ts",
      "default": "./src/api-client.ts"
    }
 */
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
