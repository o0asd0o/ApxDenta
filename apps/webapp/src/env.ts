import * as v from 'valibot';

export const envSchema = v.object({
  // Frontend URL, used to configure trusted origin (CORS)
  VITE_PUBLIC_WEB_URL: v.pipe(v.string(), v.url()),
  VITE_PUBLIC_SERVER_URL: v.pipe(v.string(), v.url()),
  VITE_ENABLE_SEEDERS: v.pipe(
    v.string(),
    v.union([v.literal('1'), v.literal('0')]),
  ),
});
