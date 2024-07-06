import { IGenericQuery } from "../dependencies/igeneric.query";
import { LogicException } from "../exceptions/logic.exception";
import { convertKeysToCamelCase } from "../helpers/common.helper";

export class Generic {
  genericQuery: IGenericQuery;
  tblName: string | undefined;
  constructor({ genericQuery }: { genericQuery: IGenericQuery }) {
    this.genericQuery = genericQuery;
  }

  setTblName(tblName: string) {
    this.tblName = tblName;
  }

  async create(data: object) {
    if (this.tblName === undefined)
      throw new LogicException(400, "Define table name!");
    return await this.genericQuery.insert(this.tblName, data);
  }

  async list(
    fields: string[],
    limit: number,
    offset: number,
    filters: object,
    orderBy: object
  ) {
    if (this.tblName === undefined)
      throw new LogicException(400, "Define table name!");
    if (fields.length === 0) throw new LogicException(400, "Define fields!");
    return convertKeysToCamelCase(
      await this.genericQuery.list(
        this.tblName,
        fields,
        limit,
        offset,
        filters,
        orderBy
      )
    );
  }

  async detail(fields: string[], filters: object) {
    if (this.tblName === undefined)
      throw new LogicException(400, "Define table name!");
    if (fields.length === 0) throw new LogicException(400, "Define fields!");
    return convertKeysToCamelCase(
      await this.genericQuery.detail(this.tblName, fields, filters)
    );
  }

  async update(data: object, filters: object) {
    if (this.tblName === undefined)
      throw new LogicException(400, "Define table name!");
    if (Object.keys(filters).length === 0)
      throw new LogicException(400, "Define filters!");
    return await this.genericQuery.update(this.tblName, data, filters);
  }

  async delete(filters: object) {
    if (this.tblName === undefined)
      throw new LogicException(400, "Define table name!");
    return await this.genericQuery.delete(this.tblName, filters);
  }

  async execFunction(funcName: string, params: object) {
    return await this.genericQuery.execFunction(funcName, params);
  }
}
