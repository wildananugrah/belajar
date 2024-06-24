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

describe("Role Service", () => {
  let roleId: string | undefined = undefined;
  const data = {
    roleName: "ADMIN",
  };
  const updatedData = {
    roleName: "SUPERADMIN",
  };

  it("it should create a role", async () => {
    const roleService: IRoleService = new RoleService(pool);
    const dbRole = await roleService.insert(data.roleName);
    if (dbRole === undefined) throw new Error("dbRole is undefined");
    expect(dbRole.roleName).toBe(data.roleName);
  });
  it("it should select all role", async () => {
    const roleService: IRoleService = new RoleService(pool);
    const dbRole = await roleService.list();
    if (dbRole === undefined) throw new Error("dbRole is undefined");
    expect(dbRole.length > 0).toBe(true);
    dbRole.map((role) => {
      expect(role.roleName).toBe(data.roleName);
      roleId = role.id;
    });
  });
  it("it should update a role", async () => {
    if (roleId === undefined) fail();
    const roleService: IRoleService = new RoleService(pool);
    const dbRole = await roleService.update(updatedData.roleName, roleId);
    if (dbRole === undefined) throw new Error("dbRole is undefined");
    expect(dbRole).toBe(true);
  });
  it("it should select a role by id", async () => {
    if (roleId === undefined) fail();
    const roleService: IRoleService = new RoleService(pool);
    const dbRole = await roleService.detail(roleId);
    if (dbRole === undefined) throw new Error("dbRole is undefined");
    expect(dbRole.roleName).toBe(updatedData.roleName);
  });
  it("it should delete a role by id", async () => {
    if (roleId === undefined) throw new Error("roleId is undefined");
    const roleService: IRoleService = new RoleService(pool);
    const dbRole = await roleService.delete(roleId);
    expect(dbRole).toBe(true);
  });
});
