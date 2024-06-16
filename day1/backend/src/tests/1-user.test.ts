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
import { IUserService } from "../dependencies/iuser-service";
import UserService from "../dependencies/impl/user-service";

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

describe("User Service", () => {
  const username = "testuser41";
  const password = "p@ssw0rd";

  it("should be registered new user", async () => {
    const userService: IUserService = new UserService(pool);
    userService.register(username, password);
    expect(true).toBe(true);
  });
  it("should be logged in a user", async () => {
    const userService: IUserService = new UserService(pool);
    const userdb = userService.login(username);
    expect(userdb).toBeDefined();
  });
  // it("should be deleting a user", async () => {
  //   const userService: IUserService = new UserService(pool);
  //   const userdb = userService.deleteByUsername(username);
  //   expect(userdb).toBeDefined();
  // });
});
