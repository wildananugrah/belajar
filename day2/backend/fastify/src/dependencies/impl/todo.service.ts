import { Pool } from "pg";
import { ITodoDB } from "../../helpers/types/todo-db.dto";
import { ITodoService } from "../itodo.service";
import { DatabaseException } from "../../exceptions/database.exception";

export class TodoService implements ITodoService {
  tblName: string = "tbl_mst_todo";
  insertQuery: string = `INSERT INTO ${this.tblName}(name, description, user_id) VALUES($1, $2, $3) RETURNING todo_id, name, description, user_id, created_at`;
  selectQueryByUserId: string = `SELECT todo_id, name, description from ${this.tblName} WHERE user_id = $1 ORDER BY created_at DESC`;
  selectQueryById: string = `SELECT todo_id, name, description from ${this.tblName} WHERE todo_id=$1`;
  updateQuery: string = `UPDATE ${this.tblName} SET name=$1, description=$2 WHERE todo_id=$3`;
  deleteQuery: string = `DELETE FROM ${this.tblName} WHERE todo_id=$1`;

  pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }

  async insert(
    name: string,
    description: string,
    userId: string
  ): Promise<ITodoDB> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(this.insertQuery, [
        name,
        description,
        userId,
      ]);
      return {
        id: dbResult.rows[0].todo_id,
        name: dbResult.rows[0].name,
        description: dbResult.rows[0].description,
        createdAt: dbResult.rows[0].created_at,
        userId: dbResult.rows[0].user_id,
      };
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
  async list(userId: string): Promise<ITodoDB[]> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(this.selectQueryByUserId, [userId]);
      return dbResult.rows.map((row: any) => ({
        id: row.todo_id,
        name: row.name,
        description: row.description,
        createdAt: row.created_at,
        userId: row.user_id,
      }));
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
  async detail(id: string): Promise<ITodoDB> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(this.selectQueryById, [id]);
      if (dbResult.rows.length === 0)
        throw new DatabaseException(400, "Data not found!");
      return {
        id: dbResult.rows[0].todo_id,
        name: dbResult.rows[0].name,
        description: dbResult.rows[0].description,
        createdAt: dbResult.rows[0].created_at,
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
  async delete(id: string): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      await this.detail(id);
      await client.query(this.deleteQuery, [id]);
      return true;
    } catch (error: any) {
      if (error instanceof DatabaseException)
        throw new DatabaseException(error.code, error.message);
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
  async update(
    name: string,
    description: string,
    id: string
  ): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      await this.detail(id);
      await client.query(this.updateQuery, [name, description, id]);
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
