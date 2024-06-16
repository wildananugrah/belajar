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
import { IUserService } from "../dependencies/iuser.service";
import UserService from "../dependencies/impl/user.service";
import { User } from "../logics/user";
import { IHealthcheckService } from "../dependencies/ihealthcheck.service";
import { HealthCheckService } from "../dependencies/impl/healthcheck.service";
import { propagation } from "@opentelemetry/api";
import { ITodoService } from "../dependencies/itodo.service";
import { TodoService } from "../dependencies/impl/todo.service";
import { Todo } from "../logics/todo";
import { IJWTService } from "../dependencies/ijwt";
import { JWTService } from "../dependencies/impl/jwt";
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
  const userService: IUserService = new UserService(pool);
  const todoService: ITodoService = new TodoService(pool);
  const healtcheckService: IHealthcheckService = new HealthCheckService(pool);
  const jwtService: IJWTService = new JWTService({
    privateKey,
    certificate,
  });
  const user = new User({ userService, jwtService });
  const todo = new Todo({ todoService, jwtService });
  app.decorate("user", user);
  app.decorate("todo", todo);
  app.decorate("healtcheckService", healtcheckService);
});
