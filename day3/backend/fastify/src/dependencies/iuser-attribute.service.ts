import { IUserAttributeDB } from "../helpers/types/user-attribute-db.dto";

export interface IUserAttributeService {
  insert(
    appName: string,
    attributeName: string,
    userId: string
  ): Promise<IUserAttributeDB>;
  list(userId: string): Promise<IUserAttributeDB[]>;
  detail(id: string): Promise<IUserAttributeDB>;
  update(appName: string, attributeName: string, id: string): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}
