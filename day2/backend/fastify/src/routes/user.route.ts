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
    method: "POST",
    url: "/user/login",
    handler: async (req: any, res: any) => {
      const { identifier, password } = req.body;
      return await app.user.login(identifier, password);
    },
  });

  app.route({
    method: "GET",
    url: "/user/me",
    handler: async (req: any, res: any) => {
      const token = req.headers.authorization.split(" ")[1];
      return await app.user.me(token);
    },
  });

  app.route({
    method: "POST",
    url: "/user/register",
    handler: async (req: any, res: any) => {
      const { identifier, password } = req.body;
      try {
        return await app.user.register(identifier, password);
      } catch (error: any) {
        return res.status(500).send({ message: error.message });
      }
    },
  });

  app.route({
    method: "DELETE",
    url: "/user",
    handler: async (req: any, res: any) => {
      try {
        const token = req.headers.authorization.split(" ")[1];
        return await app.user.delete(token);
      } catch (error: any) {
        return res.status(500).send({ message: error.message });
      }
    },
  });
};

export default routes;
