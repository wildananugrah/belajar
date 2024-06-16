import { api } from "@opentelemetry/sdk-node";
import { errorResponseHandler } from "../helpers/error.response";

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
    url: "/todo",
    handler: async (req: any, res: any) => {
      try {
        const { name, description } = req.body;
        const token = req.headers.authorization.split(" ")[1];
        return await app.todo.create(name, description, token);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
  app.route({
    method: "GET",
    url: "/todo",
    handler: async (req: any, res: any) => {
      try {
        const token = req.headers.authorization.split(" ")[1];
        return await app.todo.findAll(token);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
  app.route({
    method: "GET",
    url: "/todo/:id",
    handler: async (req: any, res: any) => {
      try {
        const { id } = req.params;
        return await app.todo.findById(id);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
  app.route({
    method: "PUT",
    url: "/todo/:id",
    handler: async (req: any, res: any) => {
      try {
        const { id } = req.params;
        const { name, description } = req.body;
        return await app.todo.update(name, description, id);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
  app.route({
    method: "DELETE",
    url: "/todo/:id",
    handler: async (req: any, res: any) => {
      try {
        const { id } = req.params;
        return await app.todo.delete(id);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
};

export default routes;
