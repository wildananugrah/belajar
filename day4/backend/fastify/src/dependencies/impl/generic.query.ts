import { Pool } from "pg";
import { DatabaseException } from "../../exceptions/database.exception";
import {
  generateDeleteQuery,
  generateFunctionQuery,
  generateInsertQuery,
  generateSelectQuery,
  generateUpdateQuery,
} from "../../helpers/generic.query.helper";
import { IGenericQuery } from "../igeneric.query";

export class GenericQuery implements IGenericQuery {
  pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }
  async list(
    tblName: string,
    fields: string[],
    limit: number,
    offset: number,
    filters: object = {},
    orderBy: object = {}
  ): Promise<any[]> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(
        generateSelectQuery(tblName, fields, limit, offset, filters, orderBy),
        Object.values(filters)
      );
      return dbResult.rows;
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }

  async detail(
    tblName: string,
    fields: string[],
    filters: object = {}
  ): Promise<any> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(
        generateSelectQuery(tblName, fields, 1, 0, filters, {}),
        Object.values(filters)
      );
      return dbResult.rows[0];
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }

  async insert(tblName: string, data: object): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(
        generateInsertQuery(tblName, data),
        Object.values(data)
      );
      return true;
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }

  async update(
    tblName: string,
    data: object,
    filters: object
  ): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      let values = Object.values(data);
      let filterValues = Object.values(filters);
      values.push(filterValues[0]);
      await client.query(generateUpdateQuery(tblName, data, filters), values);
      return true;
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }

  async delete(tblName: string, filters: object): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      await client.query(
        generateDeleteQuery(tblName, filters),
        Object.values(filters)
      );
      return true;
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }

  async execFunction(funcName: string, params: object): Promise<any> {
    const client = await this.pool.connect();
    try {
      const dbResult = await client.query(
        generateFunctionQuery(funcName, Object.keys(params)),
        Object.values(params)
      );
      return dbResult.rows;
    } catch (error: any) {
      throw new DatabaseException(500, error.message);
    } finally {
      client.release();
    }
  }
}
