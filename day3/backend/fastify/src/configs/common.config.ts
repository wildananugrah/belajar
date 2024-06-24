import dotenv from "dotenv";

dotenv.config();

export const appEnv = process.env.APP_ENV || "development";
export const appHost = process.env.APP_HOST || "0.0.0.0";
export const appPort = parseInt(process.env.APP_PORT || "8000", 10);
export const jaegerHost =
  process.env.JAEGER_URL || "http://localhost:4318/v1/traces";

export const appUsername = process.env.APP_USERNAME || "admin";
export const appPassword = process.env.APP_PASSWORD || "p@ssw0rd";
