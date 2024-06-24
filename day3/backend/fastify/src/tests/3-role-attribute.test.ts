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
import { IRoleService } from "../dependencies/irole.service";
import { RoleService } from "../dependencies/impl/role.service";
import { IRoleAttributeService } from "../dependencies/irole-attribute.service";
import { RoleAttributeService } from "../dependencies/impl/role-attribute.service";

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
  console.log("Starting truncate table...");
});

afterAll(async () => {
  await pool.end();
});

describe("Role attribute Service", () => {
  let roleId: string | undefined = undefined;
  const data = {
    roleName: "ADMIN",
  };
  const updatedData = {
    roleName: "SUPERADMIN",
  };
  const roleAttributeData = {
    appName: "app1",
    attributeName: JSON.stringify(["POST", "GET", "DELETE", "PUT"]),
  };
  const roleAttributeUpdatedData = {
    appName: "app2",
    attributeName: JSON.stringify(["POST", "GET"]),
  };
  let roleAttrId: string | undefined = undefined;

  it("it should create a role", async () => {
    const roleService: IRoleService = new RoleService(pool);
    const dbRole = await roleService.insert(data.roleName);
    if (dbRole === undefined) fail();
    expect(dbRole.roleName).toBe(data.roleName);
    roleId = dbRole.id;
  });
  it("it should add role attribute", async () => {
    const roleAttributeService: IRoleAttributeService =
      new RoleAttributeService(pool);
    if (roleId === undefined) throw new Error("roleId is undefined");
    const roleAttrDb = await roleAttributeService.insert(
      roleAttributeData.appName,
      roleAttributeData.attributeName,
      roleId
    );
    expect(roleAttrDb !== undefined).toBe(true);
    roleAttrId = roleAttrDb.id;
  });
  it("should be getting a list of role attributes", async () => {
    const roleAttributeService: IRoleAttributeService =
      new RoleAttributeService(pool);
    if (roleId === undefined) throw new Error("roleId is undefined");
    const roleAttrList = await roleAttributeService.list(roleId);
    expect(roleAttrList.length === 1).toBe(true);
  });
  it("should be getting a detail of role attributes", async () => {
    const roleAttributeService: IRoleAttributeService =
      new RoleAttributeService(pool);
    console.log(roleAttrId);
    if (roleAttrId === undefined) throw new Error("roleAttrId is undefined");
    const roleAttrDb = await roleAttributeService.detail(roleAttrId);
    expect(roleAttrDb !== undefined).toBe(true);
  });
  it("should be updating a detail of role attributes", async () => {
    const roleAttributeService: IRoleAttributeService =
      new RoleAttributeService(pool);
    if (roleAttrId === undefined) throw new Error("roleAttrId is undefined");
    const roleAttrDb = await roleAttributeService.update(
      roleAttributeUpdatedData.appName,
      roleAttributeUpdatedData.attributeName,
      roleAttrId
    );
    expect(roleAttrDb).toBe(true);
  });
  it("should be deleting a role attribute", async () => {
    const roleAttributeService: IRoleAttributeService =
      new RoleAttributeService(pool);
    if (roleAttrId === undefined) throw new Error("roleAttrId is undefined");
    const roleAttrDb = await roleAttributeService.delete(roleAttrId);
    expect(roleAttrDb).toBe(true);
  });
  it("it should delete a role by id", async () => {
    if (roleId === undefined) throw new Error("roleId is undefined");
    const roleService: IRoleService = new RoleService(pool);
    const dbResult = await roleService.delete(roleId);
    expect(dbResult).toBe(true);
  });
});
