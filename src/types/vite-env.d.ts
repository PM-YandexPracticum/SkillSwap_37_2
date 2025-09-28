interface ImportMetaEnv {
  readonly VITE_MOCK_SERVER_API_URL: string;
  readonly VITE_AUTH_USER_ID: string;
  readonly VITE_USERS_PAGE_SIZE: string;
  // другие переменные
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
