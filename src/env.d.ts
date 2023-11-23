/* eslint-disable */

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
  }
}

interface ImportMetaEnv {
  readonly VN_SITE_URL: string;
  readonly VN_APPWRITE_PROJECT_KEY: string;
  readonly VN_APPWRITE_PROJECT_ID: string;
  readonly VN_APPWRITE_PROJECT_ENDPOINT: string;
  readonly VN_APPWRITE_DB_ID: string;
  readonly VN_APPWRITE_PKG_COLL: string;
  readonly VN_NPM_API_URL: string;
  readonly VN_NPM_DOWNLOADS_COUNT_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
