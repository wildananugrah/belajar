import { IRoleDB } from "../helpers/types/role-db.dto";

export interface IRoleService {
  insert(roleName: string): Promise<IRoleDB | undefined>;
  list(): Promise<IRoleDB[] | undefined>;
  detail(id: string): Promise<IRoleDB | undefined>;
  update(rolaName: string, id: string): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
