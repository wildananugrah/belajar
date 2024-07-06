import { errorResponseHandler } from "../helpers/error.response";

const routes = async (app: any, options: any) => {
  app.route({
    method: "POST",
    url: "/_/admin/login",
    handler: async (req: any, res: any) => {
      try {
        const { username, password } = req.body;
        const user_uuid = req.headers["x-user_uuid"];
        return await app.admin.login(username, password, user_uuid);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
  app.route({
    method: "PUT",
    url: "/_/admin/token",
    handler: async (req: any, res: any) => {
      try {
        const token = req.headers.authorization.split(" ")[1];
        return await app.admin.refresh(token);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
  app.route({
    method: "GET",
    url: "/_/admin/me",
    handler: async (req: any, res: any) => {
      try {
        const token = req.headers.authorization.split(" ")[1];
        return await app.admin.validate(token);
      } catch (error: any) {
        errorResponseHandler(error, res);
      }
    },
  });
};

export default routes;
