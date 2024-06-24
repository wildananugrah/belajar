import { api } from "@opentelemetry/sdk-node";

export function customHook(app: any) {
  app.addHook("onRequest", (request: any, reply: any, done: any) => {
    request.startTime = process.hrtime();
    done();
  });

  app.addHook("onSend", (request: any, reply: any, payload: any, done: any) => {
    const activeSpan = api.trace.getSpan(api.context.active());
    const [seconds, nanoseconds] = process.hrtime(request.startTime);
    const responseTime = seconds * 1000 + nanoseconds / 1e6; // Convert to milliseconds

    console.info(
      JSON.stringify({
        spanId: activeSpan?.spanContext().spanId,
        traceId: activeSpan?.spanContext().traceId,
        traceFlag: activeSpan?.spanContext().traceFlags,
        method: request.method,
        uri: request.url,
        statusCode: reply.statusCode,
        clientIp: request.ip,
        responseTime: responseTime.toFixed(2),
      })
    );
    done();
  });
}

export function authHook(app: any) {
  app.addHook("onRequest", async (request: any, reply: any, done: any) => {
    try {
      const token = request.headers.authorization.split(" ")[1];
      await app.admin.validate(token);
    } catch (error: any) {
      reply.code(401);
      throw new Error("You are not allowed!");
    }
  });
}
