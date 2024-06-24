import { Pool } from "pg";
import { IRoleService } from "../irole.service";
import { IRoleDB } from "../../helpers/types/role-db.dto";
import { DatabaseException } from "../../exceptions/database.exception";

export class RoleService implements IRoleService {
  tblName: string = "tbl_mst_role";
  deleteAllRecordsQuery: string = `DELETE FROM ${this.tblName}`;
  insertRoleQuery: string = `INSERT INTO ${this.tblName}(role_name) VALUES($1) RETURNING *`;
  selectAllRecordsQuery: string = `SELECT role_id, role_name FROM ${this.tblName}`;
  selectByIdRecordsQuery: string = `SELECT role_id, role_name FROM ${this.tblName} WHERE role_id = $1`;
  updateRoleQuery: string = `UPDATE ${this.tblName} SET role_name = $1 WHERE role_id = $2 RETURNING *`;
  deleteByIdRecordsQuery: string = `DELETE FROM ${this.tblName} WHERE role_id = $1 RETURNING *`;
  pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }
  async insert(roleName: string): Promise<IRoleDB> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(this.insertRoleQuery, [roleName]);
      return {
        id: dbResult.rows[0].role_id,
        roleName: dbResult.rows[0].role_name,
      };
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
  async list(): Promise<IRoleDB[]> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(this.selectAllRecordsQuery, []);
      return dbResult.rows.map((row) => ({
        id: row.role_id,
        roleName: row.role_name,
      }));
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
  async detail(id: string): Promise<IRoleDB> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(this.selectByIdRecordsQuery, [id]);
      if (dbResult.rows.length === 0)
        throw new DatabaseException(400, "not found!");
      return {
        id: dbResult.rows[0].role_id,
        roleName: dbResult.rows[0].role_name,
      };
    } catch (error: any) {
      if (error instanceof DatabaseException)
        throw new DatabaseException(error.code, error.message);
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
  async update(roleName: string, id: string): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      await this.detail(id);
      const dbResult = await client.query(this.updateRoleQuery, [roleName, id]);
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
