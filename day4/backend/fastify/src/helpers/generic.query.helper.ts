export function generateSelectQuery(
  tblName: string,
  fields: string[],
  limit: number,
  offset: number,
  filters: object,
  orderBy: object
) {
  const filtersKeys = Object.keys(filters);
  const orderByKey: string[] = Object.keys(orderBy);
  const orderByValue: string[] = Object.values(orderBy);
  const conditionString = filtersKeys
    .map((key, index) => `${key}=$${index + 1}`)
    .join(" and ");
  return `
    SELECT ${fields.join(", ")} FROM ${tblName} ${
    filtersKeys.length > 0 ? ` WHERE ${conditionString}` : ""
  } 
    ${
      orderByKey.length > 0
        ? ` ORDER BY ${orderByKey[0].toLowerCase()} ${orderByValue[0].toUpperCase()}`
        : ""
    }
    LIMIT ${limit} OFFSET ${offset}`;
}

export function generateInsertQuery(tblName: string, data: object) {
  const dataKeys = Object.keys(data);
  return `
    INSERT INTO ${tblName}(${dataKeys.join(", ")})
    VALUES(${dataKeys.map((row, index) => `$${index + 1}`).join(", ")})
  `;
}

export function generateUpdateQuery(
  tblName: string,
  data: object,
  filters: object
) {
  const dataKeys = Object.keys(data);
  const filterKeys: string[] = Object.keys(filters);
  return `
        UPDATE ${tblName}
        SET ${dataKeys.map((row, index) => `${row}=$${index + 1}`).join(", ")}
        WHERE ${filterKeys[0]}=$${dataKeys.length + 1}
    `;
}

export function generateDeleteQuery(tblName: string, filters: object) {
  const filterKeys: string[] = Object.keys(filters);
  const conditionString = filterKeys
    .map((key, index) => `${key}=$${index + 1}`)
    .join(" and ");
  return `
        DELETE FROM ${tblName}
        WHERE ${conditionString}
    `;
}

export function generateFunctionQuery(funcName: string, params: string[]) {
  return `
  SELECT * FROM ${funcName}(${params
    .map((row, index) => `$${index + 1}`)
    .join(", ")})
  `;
}
