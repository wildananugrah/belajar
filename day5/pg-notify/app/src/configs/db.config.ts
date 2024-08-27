import dotenv from "dotenv";

dotenv.config();

export const dbhost: string = process.env.DB_HOST || "localhost";
export const dbDatabase: string = process.env.DB_DATABASE || "postgres";
export const dbPort: number = parseInt(process.env.DB_PORT || "8000", 10);
export const dbUser: string = process.env.DB_USER || "root";
export const dbPass: string = process.env.DB_PASS || "pass";
export const dbPoolMin: number = parseInt(process.env.DB_POOL_MIN || "1");
export const dbPoolMax: number = parseInt(process.env.DB_POOL_MAX || "1");
export const dbIdleTimeout: number = parseInt(
  process.env.DB_IDLE_TIMEOUT || "1000",
  10
);
export const dbConnectionTimeout: number = parseInt(
  process.env.DB_CONNECTION_TIMEOUT || "1000",
  10
);
export const dbMaxUses: number = parseInt(
  process.env.DB_MAX_USES || "7500",
  10
);
