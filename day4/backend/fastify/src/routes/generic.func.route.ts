import { genericMap } from "../configs/generic.map";
import { convertKeysToCamelCase } from "../helpers/common.helper";
import { authHook, customHook } from "../helpers/custom.hook";
import { errorResponseHandler } from "../helpers/error.response";
import { parseUri } from "../helpers/uri.helper";

const routes = async (app: any, options: any) => {
  customHook(app);
  authHook(app);
  app.route({
    method: "GET",
    url: "/func/:funcName",
    handler: async (req: any, res: any) => {
      const { funcName } = req.params;
      const { params } = parseUri(req.query);
      try {
        return convertKeysToCamelCase(
          await app.generic.execFunction(genericMap.funcName[funcName], params)
        );
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });

  app.route({
    method: "POST",
    url: "/func/:funcName",
    handler: async (req: any, res: any) => {
      const { funcName } = req.params;
      try {
        return await app.generic.execFunction(
          genericMap.funcName[funcName],
          req.body
        );
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
};

export default routes;
