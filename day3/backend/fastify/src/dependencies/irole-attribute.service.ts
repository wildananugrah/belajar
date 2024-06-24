import { IRoleAttributeDB } from "../helpers/types/role-attribute-db.dto";

export interface IRoleAttributeService {
  insert(
    appName: string,
    attributeName: string,
    roleId: string
  ): Promise<IRoleAttributeDB>;
  list(roleId: string): Promise<IRoleAttributeDB[]>;
  detail(id: string): Promise<IRoleAttributeDB>;
  update(appName: string, attributeName: string, id: string): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
