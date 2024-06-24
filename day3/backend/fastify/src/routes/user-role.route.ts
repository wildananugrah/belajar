import { authHook, customHook } from "../helpers/custom.hook";
import { errorResponseHandler } from "../helpers/error.response";

const routes = async (app: any, options: any) => {
  customHook(app);
  authHook(app);
  app.route({
    method: "GET",
    url: "/user/role/:userId/attr",
    handler: async (req: any, res: any) => {
      const { userId } = req.params;
      try {
        return await app.userRole.userRoleAttr(userId);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
  app.route({
    method: "POST",
    url: "/user/role/:userId",
    handler: async (req: any, res: any) => {
      const { userId } = req.params;
      const { roleId } = req.body;
      try {
        return await app.userRole.insert(userId, roleId);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
  app.route({
    method: "POST",
    url: "/user/role/:userId/bulk",
    handler: async (req: any, res: any) => {
      const { userId } = req.params;
      const { roleIds } = req.body;
      try {
        return await app.userRole.updateRoleBulk(userId, roleIds);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
  app.route({
    method: "GET",
    url: "/user/role/:userId",
    handler: async (req: any, res: any) => {
      const { userId } = req.params;
      try {
        return await app.userRole.list(userId);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
  app.route({
    method: "DELETE",
    url: "/user/role/:id",
    handler: async (req: any, res: any) => {
      const { id } = req.params;
      try {
        return await app.userRole.delete(id);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
};

export default routes;
