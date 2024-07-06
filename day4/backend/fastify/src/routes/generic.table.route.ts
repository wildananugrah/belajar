import { genericMap } from "../configs/generic.map";
import { authHook, customHook } from "../helpers/custom.hook";
import { errorResponseHandler } from "../helpers/error.response";
import { parseUri } from "../helpers/uri.helper";

const routes = async (app: any, options: any) => {
  customHook(app);
  authHook(app);
  app.route({
    method: "POST",
    url: "/resource/:tblName",
    handler: async (req: any, res: any) => {
      const { tblName } = req.params;
      try {
        app.generic.setTblName(genericMap.tableName[tblName]);
        return await app.generic.create(req.body);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });

  app.route({
    method: "GET",
    url: "/resource/:tblName",
    handler: async (req: any, res: any) => {
      const { tblName } = req.params;
      try {
        app.generic.setTblName(genericMap.tableName[tblName]);
        const {
          fields,
          limit = 100,
          offset = 0,
          filters,
          orderBy = { created_at: "DESC" },
        } = parseUri(req.query);
        return await app.generic.list(
          fields.split(","),
          limit,
          offset,
          filters,
          orderBy
        );
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });

  app.route({
    method: "GET",
    url: "/resource/:tblName/:id",
    handler: async (req: any, res: any) => {
      const { tblName } = req.params;
      try {
        app.generic.setTblName(genericMap.tableName[tblName]);
        const { fields } = req.query;
        const filters = { id: req.params.id };
        return await app.generic.detail(fields.split(","), filters);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });

  app.route({
    method: "PUT",
    url: "/resource/:tblName/:id",
    handler: async (req: any, res: any) => {
      const { tblName } = req.params;
      try {
        app.generic.setTblName(genericMap.tableName[tblName]);
        const filters = { id: req.params.id };
        return await app.generic.update(req.body, filters);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });

  app.route({
    method: "DELETE",
    url: "/resource/:tblName/:id",
    handler: async (req: any, res: any) => {
      const { tblName } = req.params;
      try {
        app.generic.setTblName(genericMap.tableName[tblName]);
        const filters = { id: req.params.id };
        return await app.generic.delete(filters);
      } catch (error: any) {
        return errorResponseHandler(error, res);
      }
    },
  });
};

export default routes;
