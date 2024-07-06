import dotenv from "dotenv";

dotenv.config();

export const privateKey = process.env.PRIVATE_KEY_FILE || "./keys/key.key";
export const certificate =
  process.env.CERTIFICATE_FILE || "./keys/certificate.crt";
export const jwtExpired = parseInt(process.env.JWT_EXPIRED || "3600", 10);
