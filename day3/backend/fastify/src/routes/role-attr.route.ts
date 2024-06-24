import { authHook, customHook } from "../helpers/custom.hook";
import { errorResponseHandler } from "../helpers/error.response";

const routes = async (app: any, options: any) => {
  customHook(app);
  authHook(app);
  app.route({
    method: "POST",
    url: "/role/attr",
    handler: async (req: any, res: any) => {
      const { module, attributes, roleId } = req.body;
      try {
        return await app.roleAttribute.create(
          module,
          JSON.stringify(attributes),
          roleId
        );
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
  app.route({
    method: "GET",
    url: "/role/attr",
    handler: async (req: any, res: any) => {
      const { roleId = "" } = req.query;
      try {
        console.log(`roleId: ${roleId}`);
        return await app.roleAttribute.list(roleId);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
  app.route({
    method: "GET",
    url: "/role/attr/:roleAttrId",
    handler: async (req: any, res: any) => {
      const { roleAttrId } = req.params;
      try {
        console.log(`roleAttrId: ${roleAttrId}`);
        return await app.roleAttribute.detail(roleAttrId);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
  app.route({
    method: "PUT",
    url: "/role/attr/:roleAttrId",
    handler: async (req: any, res: any) => {
      const { module, attributes } = req.body;
      const { roleAttrId } = req.params;
      try {
        return await app.roleAttribute.update(
          module,
          JSON.stringify(attributes),
          roleAttrId
        );
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
  app.route({
    method: "DELETE",
    url: "/role/attr/:roleAttrId",
    handler: async (req: any, res: any) => {
      const { roleAttrId } = req.params;
      try {
        return await app.roleAttribute.delete(roleAttrId);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
};

export default routes;
