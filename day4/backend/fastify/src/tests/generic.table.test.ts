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
import { GenericQuery } from "../dependencies/impl/generic.query";

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
  const tblName: string = "tbl_mst_user";

  it("should be inserting a user", async () => {
    const genericQuery = new GenericQuery(pool);
    const dbResult = await genericQuery.insert(tblName, {
      identifier: "test5@mail.com",
      password: "1234",
    });
    console.log(dbResult);
  });

  it("should be getting user list", async () => {
    const genericQuery = new GenericQuery(pool);
    const dbResult = await genericQuery.list(
      tblName,
      ["user_id", "identifier", "password", "created_at", "updated_at"],
      2,
      0,
      {},
      { created_at: "DESC" }
    );
    console.log(dbResult);
  });

  it("should be getting user detail", async () => {
    const genericQuery = new GenericQuery(pool);
    const dbResult = await genericQuery.detail(
      tblName,
      ["user_id", "identifier", "password", "created_at", "updated_at"],
      { identifier: "test5@mail.com" }
    );
    console.log(dbResult);
  });

  it("should be updating a user", async () => {
    const genericQuery = new GenericQuery(pool);
    const dbResult = await genericQuery.update(
      tblName,
      {
        identifier: "test5@mail.com",
        password: "password!",
      },
      { user_id: "39725ed3-f7a3-4572-80cf-2b569bdfb773" }
    );
    console.log(dbResult);
  });

  it("should be deleting a user", async () => {
    const genericQuery = new GenericQuery(pool);
    const dbResult = await genericQuery.delete(tblName, {
      identifier: "test5@mail.com",
    });
    console.log(dbResult);
  });
});
