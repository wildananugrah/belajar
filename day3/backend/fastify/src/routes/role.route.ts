import { authHook, customHook } from "../helpers/custom.hook";
import { errorResponseHandler } from "../helpers/error.response";

const routes = async (app: any, options: any) => {
  customHook(app);
  authHook(app);
  app.route({
    method: "POST",
    url: "/role",
    handler: async (req: any, res: any) => {
      const { roleName } = req.body;
      try {
        console.log("role create");
        return await app.role.create(roleName);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });

  app.route({
    method: "GET",
    url: "/role",
    handler: async (req: any, res: any) => {
      try {
        console.log("role list");
        return await app.role.list();
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });

  app.route({
    method: "GET",
    url: "/role/:id",
    handler: async (req: any, res: any) => {
      const { id } = req.params;
      try {
        return await app.role.detail(id);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });

  app.route({
    method: "PUT",
    url: "/role/:id",
    handler: async (req: any, res: any) => {
      const { id } = req.params;
      const { roleName } = req.body;
      try {
        return await app.role.update(roleName, id);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });

  app.route({
    method: "DELETE",
    url: "/role/:id",
    handler: async (req: any, res: any) => {
      const { id } = req.params;
      try {
        return await app.role.delete(id);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
};

export default routes;
