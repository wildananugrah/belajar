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
import { IJWTService } from "../dependencies/ijwt.service";
import { JWTService } from "../dependencies/impl/jwt.service";
import { certificate, privateKey } from "../configs/jwt.config";
import { Role } from "../logics/role";
import { IRoleService } from "../dependencies/irole.service";
import { RoleService } from "../dependencies/impl/role.service";
import { IRoleAttributeService } from "../dependencies/irole-attribute.service";
import { RoleAttributeService } from "../dependencies/impl/role-attribute.service";
import { IUserAttributeService } from "../dependencies/iuser-attribute.service";
import { UserAttributeService } from "../dependencies/impl/user-attribute.service";
import { UserAttribute } from "../logics/user-attribute";
import { RoleAttribute } from "../logics/role-attribute";
import { IUserRoleService } from "../dependencies/iuser-role.service";
import { UserRoleService } from "../dependencies/impl/user-role.service";
import { UserRole } from "../logics/user-role";
import { Admin } from "../logics/admin";
import { Auth } from "../logics/auth";

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
  const roleService: IRoleService = new RoleService(pool);
  const roleAttrService: IRoleAttributeService = new RoleAttributeService(pool);
  const userAttrService: IUserAttributeService = new UserAttributeService(pool);
  const userRoleService: IUserRoleService = new UserRoleService(pool);
  const healtcheckService: IHealthcheckService = new HealthCheckService(pool);
  const jwtService: IJWTService = new JWTService({
    privateKey,
    certificate,
  });
  const user = new User({ userService });
  const auth = new Auth({ userService, userRoleService, jwtService });
  const userAttribute = new UserAttribute({ userAttrService });
  const roleAttribute = new RoleAttribute({ roleAttrService });
  const role = new Role({ roleService });
  const userRole = new UserRole({ userRoleService });
  const admin = new Admin({ jwtService });
  app.decorate("role", role);
  app.decorate("user", user);
  app.decorate("userAttribute", userAttribute);
  app.decorate("roleAttribute", roleAttribute);
  app.decorate("userRole", userRole);
  app.decorate("admin", admin);
  app.decorate("auth", auth);
  app.decorate("healtcheckService", healtcheckService);
});
