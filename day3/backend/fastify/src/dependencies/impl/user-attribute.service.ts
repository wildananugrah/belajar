import { Pool } from "pg";
import { IUserAttributeDB } from "../../helpers/types/user-attribute-db.dto";
import { DatabaseException } from "../../exceptions/database.exception";
import { IUserAttributeService } from "../iuser-attribute.service";

export class UserAttributeService implements IUserAttributeService {
  tblName: string = "tbl_mst_user_attribute";
  deleteAllRecordsQuery: string = `DELETE FROM ${this.tblName}`;
  insertQuery: string = `INSERT INTO ${this.tblName}(module, attributes, user_id) VALUES($1, $2, $3) RETURNING *`;
  selectAllRecordsQuery: string = `SELECT user_id, module, attributes, user_attribute_id FROM ${this.tblName} WHERE user_id=$1`;
  selectByIdRecordsQuery: string = `SELECT user_id, module, attributes, user_attribute_id FROM ${this.tblName} WHERE user_attribute_id = $1`;
  updateQuery: string = `UPDATE ${this.tblName} SET module = $1, attributes = $2 WHERE user_attribute_id = $3`;
  deleteByIdRecordsQuery: string = `DELETE FROM ${this.tblName} WHERE user_attribute_id = $1`;
  pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }
  async insert(
    module: string,
    attributes: string,
    userId: string
  ): Promise<IUserAttributeDB> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(this.insertQuery, [
        module,
        attributes,
        userId,
      ]);
      return {
        id: dbResult.rows[0].user_attribute_id,
        module: dbResult.rows[0].module,
        attributes: dbResult.rows[0].attributes,
        userId: dbResult.rows[0].user_id,
      };
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
  async list(userId: string): Promise<IUserAttributeDB[]> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(this.selectAllRecordsQuery, [userId]);
      return dbResult.rows.map((row) => ({
        id: row.user_attribute_id,
        module: row.module,
        attributes: row.attributes,
        userId: row.user_id,
      }));
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
  async detail(id: string): Promise<IUserAttributeDB> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(this.selectByIdRecordsQuery, [id]);
      if (dbResult.rows.length === 0)
        throw new DatabaseException(400, "not found!");
      return {
        id: dbResult.rows[0].user_attribute_id,
        module: dbResult.rows[0].module,
        attributes: dbResult.rows[0].attributes,
        userId: dbResult.rows[0].user_id,
      };
    } catch (error: any) {
      if (error instanceof DatabaseException)
        throw new DatabaseException(error.code, error.message);
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
  async update(
    module: string,
    attributes: string,
    id: string
  ): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      await this.detail(id);
      const dbResult = await client.query(this.updateQuery, [
        module,
        attributes,
        id,
      ]);
      return true;
    } catch (error: any) {
      if (error instanceof DatabaseException)
        throw new DatabaseException(error.code, error.message);
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
  async delete(id: string): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      await this.detail(id);
      const dbResult = await client.query(this.deleteByIdRecordsQuery, [id]);
      return true;
    } catch (error: any) {
      if (error instanceof DatabaseException)
        throw new DatabaseException(error.code, error.message);
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
}
