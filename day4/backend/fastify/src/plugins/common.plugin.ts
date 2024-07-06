import { Pool } from "pg";
import fp from "fastify-plugin";
import {
  dbConnectionTimeout,
  dbDatabase,
  dbIdleTimeout,
  dbMaxUses,
  dbPass,
  dbPoolMax,
  dbPoolMin,
  dbPort,
  dbUser,
  dbhost,
} from "../configs/db.config";
import { IGenericQuery } from "../dependencies/igeneric.query";
import { GenericQuery } from "../dependencies/impl/generic.query";
import { Generic } from "../logics/generic.logic";
import { Admin } from "../logics/admin";
import { IJWTService } from "../dependencies/ijwt.service";
import { JWTService } from "../dependencies/impl/jwt.service";
import { certificate, privateKey } from "../configs/jwt.config";

export default fp(async (app, options) => {
  var pool = new Pool({
    host: dbhost,
    database: dbDatabase,
    port: dbPort,
    user: dbUser,
    password: dbPass,
    ssl: false,
    min: dbPoolMin,
    max: dbPoolMax,
    idleTimeoutMillis: dbIdleTimeout,
    connectionTimeoutMillis: dbConnectionTimeout,
    maxUses: dbMaxUses,
  });
  const genericQuery: IGenericQuery = new GenericQuery(pool);
  const jwtService: IJWTService = new JWTService({
    privateKey: privateKey,
    certificate: certificate,
  });
  const generic = new Generic({ genericQuery });
  const admin = new Admin({ jwtService });

  app.decorate("generic", generic);
  app.decorate("admin", admin);
});
