import { IUserService, UserType } from "../iuser-service";
import { Pool } from "pg";

export default class UserService implements IUserService {
  tblName: string = "tbl_mst_user";
  selectByIdentifierQuery: string = `SELECT user_id, identifier, password, created_at FROM ${this.tblName} WHERE identifier=$1`;
  deleteByIdentifierQuery: string = `DELETE FROM ${this.tblName} WHERE identifier=$1`;
  insertUser: string = `INSERT INTO ${this.tblName} (identifier, password) VALUES ($1, $2) RETURNING *`;
  pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }
  async deleteByUsername(username: string): Promise<object | null> {
    const client = await this.pool.connect();
    console.log(username);
    try {
      console.log(this.deleteByIdentifierQuery);
      const dbResult = await client.query(this.deleteByIdentifierQuery, [
        username,
      ]);
      if (dbResult.rows.length === 0) return null;
      return { result: true };
    } catch (error) {
      console.error(error);
      if (error instanceof Error)
        throw new Error(`Error in deleting user: ${error.message}`);
      return null;
    } finally {
      client.release();
    }
  }
  async login(username: string): Promise<UserType | null> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(this.selectByIdentifierQuery, [
        username,
      ]);
      if (dbResult.rows.length === 0) return null;
      return {
        id: dbResult.rows[0].user_id,
        username: dbResult.rows[0].identifier,
        password: dbResult.rows[0].password,
        created_at: dbResult.rows[0].created_at,
      };
    } catch (error: any) {
      console.error(error);
      throw new Error(`Error in retrieving user: ${error.message}`);
    } finally {
      client.release();
    }
  }

  async register(username: string, password: string): Promise<any> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(this.insertUser, [
        username,
        password,
      ]);
      return {
        id: dbResult.rows[0].user_id,
        username: dbResult.rows[0].identifier,
        password: dbResult.rows[0].password,
        created_at: dbResult.rows[0].created_at,
      };
    } catch (error: any) {
      console.error(error);
      throw new Error(`Error in creating user: ${error.message}`);
    } finally {
      client.release();
    }
  }
}
