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
import { IUserService } from "../dependencies/iuser-service";
import UserService from "../dependencies/impl/user-service";
import { User } from "../logics/user";

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
  const userService: IUserService = new UserService(pool);
  const user = new User({ userService });
  app.decorate("user", user);
});
