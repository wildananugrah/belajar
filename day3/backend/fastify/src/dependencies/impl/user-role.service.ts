import { Pool } from "pg";
import { IUserRoleDB } from "../../helpers/types/user-role-db.dto";
import { DatabaseException } from "../../exceptions/database.exception";
import { IUserRoleService } from "../iuser-role.service";
import { IUserRoleAttrDB } from "../../helpers/types/user-role-attr-db.dto";

export class UserRoleService implements IUserRoleService {
  tblName: string = "tbl_trx_user_role";
  insertQuery: string = `INSERT INTO ${this.tblName}(user_id, role_id) VALUES($1, $2) RETURNING *`;
  selectByUserIdQuery: string = `SELECT 
      a.user_role_id, 
      a.user_id, 
      a.role_id, 
      a.created_at,
      b.role_name
    FROM ${this.tblName} a
    JOIN tbl_mst_role b on b.role_id = a.role_id
    WHERE a.user_id=$1`;
  deleteByIdQuery: string = `DELETE FROM ${this.tblName} WHERE user_role_id=$1`;
  deleteByUserIdQuery: string = `DELETE FROM ${this.tblName} WHERE user_id=$1`;
  selectUserAttrQuery: string = `
    select 
      role_attribute_id, 
      module, 
      attributes, 
      created_at, 
      user_id 
    from (select 
      tmra.role_attribute_id, 
      tmra.module, 
      tmra.attributes,
      tmra.created_at,
      tmu.user_id
    from tbl_trx_user_role ttur
    join tbl_mst_role tmr on ttur.role_id = tmr.role_id
    join tbl_mst_role_attribute tmra on tmra.role_id  = tmr.role_id 
    join tbl_mst_user tmu on ttur.user_id = tmu.user_id
    union
    select 
      tmua.user_attribute_id, 
      tmua.module, 
      tmua.attributes, 
      tmua.created_at,
      tmu.user_id
    from tbl_mst_user_attribute tmua
    join tbl_mst_user tmu on tmu.user_id = tmua.user_id) as a 
    where a.user_id=(select user_id from tbl_mst_user tmu where user_id=$1)
    order by a.created_at asc
  `;
  pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }
  async insert(userId: string, roleId: string): Promise<IUserRoleDB> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(this.insertQuery, [userId, roleId]);
      return {
        userId: dbResult.rows[0].user_id,
        roleId: dbResult.rows[0].role_id,
        id: dbResult.rows[0].user_role_id,
        roleName: dbResult.rows[0].role_name
      };
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
  async insertBulk(userId: string, roleIds: string[]): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      await Promise.all(
        roleIds.map((roleId: string) =>
          client.query(this.insertQuery, [userId, roleId])
        )
      );
      return true;
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
  async userRoleAttr(userId: string): Promise<IUserRoleAttrDB[]> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(this.selectUserAttrQuery, [userId]);
      return dbResult.rows.map((row) => ({
        roleAttributeId: row.role_attribute_id,
        module: row.module,
        attributes: row.attributes,
        createdAt: row.created_at,
        userId: row.user_id,
      }));
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
  async list(userId: string): Promise<IUserRoleDB[]> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(this.selectByUserIdQuery, [userId]);
      return dbResult.rows.map((row) => ({
        userId: row.user_id,
        roleId: row.role_id,
        id: row.user_role_id,
        roleName: row.role_name
      }));
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
  async delete(id: string): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(this.deleteByIdQuery, [id]);
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
      const dbResult = await client.query(this.deleteByUserIdQuery, [userId]);
      return true;
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
}
