import { authHook, customHook } from "../helpers/custom.hook";
import { errorResponseHandler } from "../helpers/error.response";

const routes = async (app: any, options: any) => {
  customHook(app);
  authHook(app);
  app.route({
    method: "POST",
    url: "/user/attr",
    handler: async (req: any, res: any) => {
      const { module, attributes, userId } = req.body;
      try {
        return await app.userAttribute.create(
          module,
          JSON.stringify(attributes),
          userId
        );
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
  app.route({
    method: "GET",
    url: "/user/attr",
    handler: async (req: any, res: any) => {
      const { userId = "" } = req.query;
      try {
        return await app.userAttribute.list(userId);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
  app.route({
    method: "GET",
    url: "/user/attr/:userAttrId",
    handler: async (req: any, res: any) => {
      const { userAttrId } = req.params;
      try {
        return await app.userAttribute.detail(userAttrId);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
  app.route({
    method: "PUT",
    url: "/user/attr/:userAttrId",
    handler: async (req: any, res: any) => {
      const { module, attributes } = req.body;
      const { userAttrId } = req.params;
      try {
        return await app.userAttribute.update(
          module,
          JSON.stringify(attributes),
          userAttrId
        );
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
  app.route({
    method: "DELETE",
    url: "/user/attr/:userAttrId",
    handler: async (req: any, res: any) => {
      const { userAttrId } = req.params;
      try {
        return await app.userAttribute.delete(userAttrId);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
};

export default routes;
