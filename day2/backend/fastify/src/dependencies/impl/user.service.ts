import { DatabaseException } from "../../exceptions/database.exception";
import { IUserDB } from "../../helpers/types/user-db.dto";
import { IUserService } from "../iuser.service";
import { Pool } from "pg";

export default class UserService implements IUserService {
  tblName: string = "tbl_mst_user";
  selectByIdentifierQuery: string = `SELECT user_id, identifier, password, created_at FROM ${this.tblName} WHERE identifier=$1`;
  deleteByIdentifierQuery: string = `DELETE FROM ${this.tblName} WHERE identifier=$1`;
  deleteByUserIdQuery: string = `DELETE FROM ${this.tblName} WHERE user_id=$1`;
  insertUser: string = `INSERT INTO ${this.tblName} (identifier, password) VALUES ($1, $2) RETURNING *`;
  pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }
  async deleteByIdentifier(identifier: string): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      await client.query(this.deleteByIdentifierQuery, [identifier]);
      return true;
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
  async deleteByUserId(userId: string): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      await client.query(this.deleteByUserIdQuery, [userId]);
      return true;
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
  async login(identifier: string): Promise<IUserDB | null> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(this.selectByIdentifierQuery, [
        identifier,
      ]);
      if (dbResult.rows.length === 0) return null;
      return {
        id: dbResult.rows[0].user_id,
        identifier: dbResult.rows[0].identifier,
        password: dbResult.rows[0].password,
        created_at: dbResult.rows[0].created_at,
      };
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }

  async register(identifier: string, password: string): Promise<IUserDB> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(this.insertUser, [
        identifier,
        password,
      ]);
      return {
        id: dbResult.rows[0].user_id,
        identifier: dbResult.rows[0].identifier,
        password: dbResult.rows[0].password,
        created_at: dbResult.rows[0].created_at,
      };
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
}
