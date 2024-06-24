import { Pool } from "pg";
import { IRoleAttributeDB } from "../../helpers/types/role-attribute-db.dto";
import { DatabaseException } from "../../exceptions/database.exception";
import { IRoleAttributeService } from "../irole-attribute.service";

export class RoleAttributeService implements IRoleAttributeService {
  tblName: string = "tbl_mst_role_attribute";
  deleteAllRecordsQuery: string = `DELETE FROM ${this.tblName}`;
  insertQuery: string = `INSERT INTO ${this.tblName}(module, attributes, role_id) VALUES($1, $2, $3) RETURNING *`;
  selectAllRecordsQuery: string = `SELECT role_id, module, attributes, role_attribute_id FROM ${this.tblName} WHERE role_id=$1`;
  selectByIdRecordsQuery: string = `SELECT role_id, module, attributes, role_attribute_id FROM ${this.tblName} WHERE role_attribute_id = $1`;
  updateQuery: string = `UPDATE ${this.tblName} SET module = $1, attributes = $2 WHERE role_attribute_id = $3`;
  deleteByIdRecordsQuery: string = `DELETE FROM ${this.tblName} WHERE role_attribute_id = $1`;
  pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }
  async insert(
    module: string,
    attributes: string,
    roleId: string
  ): Promise<IRoleAttributeDB> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(this.insertQuery, [
        module,
        attributes,
        roleId,
      ]);
      return {
        id: dbResult.rows[0].role_attribute_id,
        module: dbResult.rows[0].module,
        attributes: dbResult.rows[0].attributes,
        roleId: dbResult.rows[0].role_id,
      };
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
  async list(roleId: string): Promise<IRoleAttributeDB[]> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(this.selectAllRecordsQuery, [roleId]);
      return dbResult.rows.map((row) => ({
        id: row.role_attribute_id,
        module: row.module,
        attributes: row.attributes,
        roleId: row.role_id,
      }));
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
  async detail(id: string): Promise<IRoleAttributeDB> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(this.selectByIdRecordsQuery, [id]);
      if (dbResult.rows.length === 0)
        throw new DatabaseException(400, "not found!");
      return {
        id: dbResult.rows[0].role_attribute_id,
        module: dbResult.rows[0].module,
        attributes: dbResult.rows[0].attributes,
        roleId: dbResult.rows[0].role_id,
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
