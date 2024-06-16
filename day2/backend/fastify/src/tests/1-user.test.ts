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
import { LogicException } from "../exceptions/logic.exception";

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

describe("User Service normal", () => {
  const identifier = "testuser1";
  const password = "p@ssw0rd";

  it("should be registered new user", async () => {
    const userService: IUserService = new UserService(pool);
    const userdb = await userService.register(identifier, password);
    expect(userdb.identifier).toBe(identifier);
    expect(userdb.password).toBe(password);
  });
  it("should be logged in a user", async () => {
    const userService: IUserService = new UserService(pool);
    const userdb = await userService.login(identifier);
    if (userdb === null) throw new LogicException(400, "Invalid identifier");
    expect(userdb.identifier).toBe(identifier);
    expect(userdb.password).toBe(password);
  });
  it("should be deleting a user", async () => {
    const userService: IUserService = new UserService(pool);
    const userdb = await userService.deleteByIdentifier(identifier);
    expect(userdb).toBe(true);
  });
});
