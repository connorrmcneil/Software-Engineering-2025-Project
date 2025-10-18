declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string
    DATABASE_URL: string
    ORIGIN: string
    JWT_SECRET: string
  }
}
