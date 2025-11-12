/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AMAP_KEY: string;
  readonly VITE_LOCAL_LOCATION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
