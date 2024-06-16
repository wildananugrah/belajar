import { api } from "@opentelemetry/sdk-node";

const routes = async (app: any, options: any) => {
  // Start timing the request
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
        responseTime: responseTime.toFixed(2),
      })
    );
    done();
  });

  app.route({
    method: "GET",
    url: "/_/healthcheck",
    handler: async (req: any, res: any) => {
      try {
        return res
          .status(200)
          .send({ app: true, db: await app.healtcheckService.healthcheck() });
      } catch (error: any) {
        console.log(error.message);
        return res.status(500).send({ app: false, db: false });
      }
    },
  });
};

export default routes;
