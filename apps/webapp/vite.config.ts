import tailwindcss from '@tailwindcss/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

import { resolve } from 'node:path';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import valibotPlugin from 'vite-plugin-valibot-env';
import { envSchema } from './src/env';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    valibotPlugin(envSchema),
    TanStackRouterVite({ routeToken: 'layout', autoCodeSplitting: true }),
    viteReact(),
    tailwindcss(),
  ],

  test: {
    globals: true,
    environment: 'jsdom',
  },
  define: { global: 'window' },
  resolve: {
    alias: [
      {
        find: /zod\/v4\/core/,
        replacement: resolve('../../', 'node_modules', 'zod', 'v4', 'core'),
      },
      {
        find: '@',
        replacement: resolve(__dirname, './src'),
      },
    ],
  },
});
