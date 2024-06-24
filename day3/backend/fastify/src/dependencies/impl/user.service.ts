import { DatabaseException } from "../../exceptions/database.exception";
import { IUserDB } from "../../helpers/types/user-db.dto";
import { IUserService } from "../iuser.service";
import { Pool } from "pg";

export default class UserService implements IUserService {
  tblName: string = "tbl_mst_user";
  selectByIdentifierQuery: string = `SELECT user_id, identifier, password, created_at FROM ${this.tblName} WHERE identifier=$1`;
  selectByIdQuery: string = `SELECT user_id, identifier, password, created_at FROM ${this.tblName} WHERE user_id=$1`;
  updatePasswordByIdQuery: string = `UPDATE ${this.tblName} SET password=$1 WHERE user_id=$2`;
  deleteByUserIdQuery: string = `DELETE FROM ${this.tblName} WHERE user_id=$1`;
  insertUser: string = `INSERT INTO ${this.tblName} (identifier, password) VALUES ($1, $2) RETURNING *`;
  selectQuery: string = `SELECT user_id, identifier, password, created_at FROM ${this.tblName}`;
  pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }
  async list(): Promise<IUserDB[]> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(this.selectQuery, []);
      return dbResult.rows.map((row) => ({
        id: row.user_id,
        identifier: row.identifier,
        password: row.password,
        createdAt: row.created_at,
      }));
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
  async selectById(userId: string): Promise<IUserDB> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(this.selectByIdQuery, [userId]);
      return {
        id: dbResult.rows[0].user_id,
        identifier: dbResult.rows[0].identifier,
        password: dbResult.rows[0].password,
        createdAt: dbResult.rows[0].created_at,
      };
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
  async updatePassword(password: string, userId: string): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      await client.query(this.updatePasswordByIdQuery, [password, userId]);
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
  async selectByIdentifier(identifier: string): Promise<IUserDB> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(this.selectByIdentifierQuery, [
        identifier,
      ]);
      if (dbResult.rows.length === 0)
        throw new DatabaseException(400, "not found!");
      return {
        id: dbResult.rows[0].user_id,
        identifier: dbResult.rows[0].identifier,
        password: dbResult.rows[0].password,
        createdAt: dbResult.rows[0].created_at,
      };
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }

  async insert(identifier: string, password: string): Promise<IUserDB> {
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
        createdAt: dbResult.rows[0].created_at,
      };
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
}
