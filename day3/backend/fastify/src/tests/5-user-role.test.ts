import { Pool } from "pg";

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
import { IRoleService } from "../dependencies/irole.service";
import { RoleService } from "../dependencies/impl/role.service";
import { IUserRoleService } from "../dependencies/iuser-role.service";
import { UserRoleService } from "../dependencies/impl/user-role.service";

const config = {
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
};
const pool = new Pool(config);

beforeAll(async () => {
  console.log(`Connecting to ${dbhost}:${dbPort} databases...`);
  console.log(config);
});

afterAll(async () => {
  await pool.end();
});

describe("User Role Service normal", () => {
  const identifier = "testuser1";
  const password = "p@ssw0rd";
  let userId: string | undefined = undefined;
  let roleId: string | undefined = undefined;
  let userRoleId: string | undefined = undefined;
  const data = {
    roleName: "ADMIN",
  };
  const updatedData = {
    roleName: "SUPERADMIN",
  };

  it("should be inserted new user", async () => {
    const userService: IUserService = new UserService(pool);
    const userdb = await userService.insert(identifier, password);
    expect(userdb.identifier).toBe(identifier);
    expect(userdb.password).toBe(password);
    userId = userdb.id;
  });
  it("it should create a role", async () => {
    const roleService: IRoleService = new RoleService(pool);
    const dbRole = await roleService.insert(data.roleName);
    if (dbRole === undefined) throw new Error("dbRole is undefined");
    expect(dbRole.roleName).toBe(data.roleName);
    roleId = dbRole.id;
  });
  it("it should create a user role", async () => {
    const userRoleService: IUserRoleService = new UserRoleService(pool);
    if (roleId === undefined) throw new Error("roleId is undefined");
    if (userId === undefined) throw new Error("userId is undefined");
    const userRoleDb = await userRoleService.insert(userId, roleId);
    expect(userRoleDb !== undefined).toBe(true);
    userRoleId = userRoleDb.id;
  });
  it("it should select list of user roles", async () => {
    const userRoleService: IUserRoleService = new UserRoleService(pool);
    if (userId === undefined) throw new Error("userId is undefined");
    const userRoleDb = await userRoleService.list(userId);
    expect(userRoleDb.length === 1).toBe(true);
  });
  it("it should delete a user role", async () => {
    const userRoleService: IUserRoleService = new UserRoleService(pool);
    if (userRoleId === undefined) throw new Error("userRoleId is undefined");
    const userRoleDb = await userRoleService.delete(userRoleId);
    expect(userRoleDb).toBe(true);
  });
  it("it should delete a role by id", async () => {
    if (roleId === undefined) fail();
    const roleService: IRoleService = new RoleService(pool);
    await roleService.delete(roleId);
  });
  it("should be deleting a user", async () => {
    const userService: IUserService = new UserService(pool);
    if (userId === undefined) throw new Error("userId is undefined");
    const userdb = await userService.deleteByUserId(userId);
    expect(userdb).toBe(true);
  });
});
