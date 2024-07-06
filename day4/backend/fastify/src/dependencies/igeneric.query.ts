export interface IGenericQuery {
  list(
    tblName: string,
    fields: string[],
    limit: number,
    offset: number,
    filters: object,
    orderBy: object
  ): Promise<any[]>;
  detail(tblName: string, fields: string[], filters: object): Promise<any>;
  insert(tblName: string, data: object): Promise<boolean>;
  update(tblName: string, data: object, filters: object): Promise<boolean>;
  delete(tblName: string, filters: object): Promise<boolean>;
  execFunction(funcName: string, params: object): Promise<any>;
}
