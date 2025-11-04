/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_WEB_URL: string;
  readonly VITE_PUBLIC_SERVER_URL: string;
  readonly VITE_PUBLIC_CDN_URL: string;
  readonly VITE_ENABLE_SEEDERS: '1' | '0';
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
