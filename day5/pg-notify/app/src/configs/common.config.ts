import dotenv from "dotenv";

dotenv.config();

export const appEnv = process.env.APP_ENV || "development";
export const appHost = process.env.APP_HOST || "0.0.0.0";
export const appPort = parseInt(process.env.APP_PORT || "8000", 10);
export const targetFolder = process.env.APP_TARGET_FOLDER || "./images";
export const limitImages = parseInt(process.env.LIMIT_IMAGES || "2", 10);
