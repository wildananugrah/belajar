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
  const updatedPassword = "p@ssw0rd1!";
  let userId = "";

  it("should be inserted new user", async () => {
    const userService: IUserService = new UserService(pool);
    const userdb = await userService.insert(identifier, password);
    expect(userdb.identifier).toBe(identifier);
    expect(userdb.password).toBe(password);
    userId = userdb.id;
  });
  it("should be selected a user by identifier", async () => {
    const userService: IUserService = new UserService(pool);
    const userdb = await userService.selectByIdentifier(identifier);
    if (userdb === null) throw new LogicException(400, "Invalid identifier");
    expect(userdb.identifier).toBe(identifier);
    expect(userdb.password).toBe(password);
  });
  it("should be selected a user by id", async () => {
    const userService: IUserService = new UserService(pool);
    const userdb = await userService.selectById(userId);
    if (userdb === null) throw new LogicException(400, "Invalid identifier");
    expect(userdb.identifier).toBe(identifier);
    expect(userdb.password).toBe(password);
  });
  it("should be updating password a user by id", async () => {
    const userService: IUserService = new UserService(pool);
    const userdb = await userService.updatePassword(updatedPassword, userId);
    if (userdb === null) throw new LogicException(400, "Invalid identifier");
    expect(userdb).toBe(true);
  });
  it("should be selected a user by id", async () => {
    const userService: IUserService = new UserService(pool);
    const userdb = await userService.selectById(userId);
    if (userdb === null) throw new LogicException(400, "Invalid identifier");
    expect(userdb.identifier).toBe(identifier);
    expect(userdb.password).toBe(updatedPassword);
  });
  it("should be deleting a user", async () => {
    const userService: IUserService = new UserService(pool);
    const userdb = await userService.deleteByUserId(userId);
    expect(userdb).toBe(true);
  });
});
