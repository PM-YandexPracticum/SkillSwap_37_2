interface ImportMetaEnv {
  readonly VITE_AUTH_USER_ID: string;
  // другие переменные
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
