import { authHook, customHook } from "../helpers/custom.hook";
import { errorResponseHandler } from "../helpers/error.response";

const routes = async (app: any, options: any) => {
  customHook(app);
  authHook(app);
  app.route({
    method: "POST",
    url: "/user",
    handler: async (req: any, res: any) => {
      const { identifier, password } = req.body;
      try {
        return await app.user.create(identifier, password);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });

  app.route({
    method: "GET",
    url: "/user",
    handler: async (req: any, res: any) => {
      try {
        return await app.user.list();
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });

  app.route({
    method: "GET",
    url: "/user/:id",
    handler: async (req: any, res: any) => {
      const { id } = req.params;
      try {
        return await app.user.detail(id);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });

  app.route({
    method: "PUT",
    url: "/user/:id",
    handler: async (req: any, res: any) => {
      const { id } = req.params;
      const { password } = req.body;
      try {
        return await app.user.updatePassword(password, id);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });

  app.route({
    method: "DELETE",
    url: "/user/:id",
    handler: async (req: any, res: any) => {
      const { id } = req.params;
      try {
        return await app.user.delete(id);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
};

export default routes;
