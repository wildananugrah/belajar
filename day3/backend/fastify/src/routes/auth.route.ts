import { customHook } from "../helpers/custom.hook";
import { errorResponseHandler } from "../helpers/error.response";

const routes = async (app: any, options: any) => {
  customHook(app);
  app.route({
    method: "POST",
    url: "/user/auth",
    handler: async (req: any, res: any) => {
      const { identifier, password } = req.body;
      try {
        return await app.user.login(identifier, password);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });

  app.route({
    method: "GET",
    url: "/user/access/:module",
    handler: async (req: any, res: any) => {
      try {
        const token = req.headers.authorization.split(" ")[1];
        const { module } = req.params;
        return await app.user.userAccessValidation(module, token);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
};

export default routes;
