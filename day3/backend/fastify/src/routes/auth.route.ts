import { customHook } from "../helpers/custom.hook";
import { errorResponseHandler } from "../helpers/error.response";

const routes = async (app: any, options: any) => {
  customHook(app);
  app.route({
    method: "POST",
    url: "/auth/user",
    handler: async (req: any, res: any) => {
      const { identifier, password } = req.body;
      try {
        return await app.auth.login(identifier, password);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });

  app.route({
    method: "GET",
    url: "/auth/access/attr",
    handler: async (req: any, res: any) => {
      try {
        const token = req.headers.authorization.split(" ")[1];
        return app.auth.getUserAttr(token);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });

  app.route({
    method: "GET",
    url: "/auth/access/:module",
    handler: async (req: any, res: any) => {
      try {
        const token = req.headers.authorization.split(" ")[1];
        const { module } = req.params;
        return await app.auth.userAccessValidation(module, token);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
};

export default routes;
