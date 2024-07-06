interface IGenericMap {
  tableName: {
    [key: string]: string;
  };
  funcName: {
    [key: string]: string;
  };
}
export const genericMap: IGenericMap = {
  tableName: {
    user: "tbl_mst_user",
    role: "tbl_mst_role",
  },
  funcName: {
    users: "get_users",
  },
};
