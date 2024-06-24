import { IUserRoleAttrDB } from "../helpers/types/user-role-attr-db.dto";
import { IUserRoleDB } from "../helpers/types/user-role-db.dto";

export interface IUserRoleService {
  insert(userId: string, roleId: string): Promise<IUserRoleDB>;
  list(userId: string): Promise<IUserRoleDB[]>;
  delete(id: string): Promise<boolean>;
  userRoleAttr(userId: string): Promise<IUserRoleAttrDB[]>;
  insertBulk(userId: string, roleIds: string[]): Promise<boolean>
  deleteByUserId(userId: string): Promise<boolean>;
}
