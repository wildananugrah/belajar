export const backendService =
  process.env.BACKEND_SERVICE || "http://localhost:8000";
export const jaegerHost =
  process.env.JAEGER_URL || "http://localhost:4318/v1/traces";
