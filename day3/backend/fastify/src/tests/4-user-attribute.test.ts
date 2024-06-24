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
import { IUserAttributeService } from "../dependencies/iuser-attribute.service";
import { UserAttributeService } from "../dependencies/impl/user-attribute.service";

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

describe("User Attribute Service", () => {
  const identifier = "testuser1";
  const password = "p@ssw0rd";
  let userId: string | undefined = undefined;

  const userAttributeData = {
    appName: "app1",
    attributeName: JSON.stringify(["POST", "GET", "DELETE", "PUT"]),
  };
  const userAttributeUpdatedData = {
    appName: "app2",
    attributeName: JSON.stringify(["POST", "GET"]),
  };
  let userAttrId: string | undefined = undefined;

  it("it should create a user", async () => {
    const userService: IUserService = new UserService(pool);
    const userDb = await userService.insert(identifier, password);
    if (userDb === undefined) fail();
    expect(userDb.identifier).toBe(identifier);
    userId = userDb.id;
  });
  it("it should add user attribute", async () => {
    const userAttributeService: IUserAttributeService =
      new UserAttributeService(pool);
    if (userId === undefined) throw new Error("userId is undefined");
    const userAttrDb = await userAttributeService.insert(
      userAttributeData.appName,
      userAttributeData.attributeName,
      userId
    );
    expect(userAttrDb !== undefined).toBe(true);
    userAttrId = userAttrDb.id;
  });
  it("should be getting a list of user attributes", async () => {
    const userAttributeService: IUserAttributeService =
      new UserAttributeService(pool);
    if (userId === undefined) throw new Error("userId is undefined");
    const userAttrList = await userAttributeService.list(userId);
    expect(userAttrList.length === 1).toBe(true);
  });
  it("should be getting a detail of role attributes", async () => {
    const userAttributeService: IUserAttributeService =
      new UserAttributeService(pool);
    if (userAttrId === undefined) throw new Error("userAttrId is undefined");
    const userAttrDb = await userAttributeService.detail(userAttrId);
    expect(userAttrDb !== undefined).toBe(true);
  });
  it("should be updating a detail of role attributes", async () => {
    const userAttributeService: IUserAttributeService =
      new UserAttributeService(pool);
    if (userAttrId === undefined) throw new Error("roleAttrId is undefined");
    const userAttrDb = await userAttributeService.update(
      userAttributeUpdatedData.appName,
      userAttributeUpdatedData.attributeName,
      userAttrId
    );
    expect(userAttrDb).toBe(true);
  });
  it("should be deleting a role attribute", async () => {
    const userAttributeService: IUserAttributeService =
      new UserAttributeService(pool);
    if (userAttrId === undefined) throw new Error("roleAttrId is undefined");
    const userAttrDb = await userAttributeService.delete(userAttrId);
    expect(userAttrDb).toBe(true);
  });
  it("it should delete a user by id", async () => {
    if (userId === undefined) fail();
    const userService: IUserService = new UserService(pool);
    const dbResult = await userService.deleteByUserId(userId);
    expect(dbResult).toBe(true);
  });
});
