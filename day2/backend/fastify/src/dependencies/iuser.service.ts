import { IUserDB } from "../helpers/types/user-db.dto";

export interface IUserService {
  login(identifier: string): Promise<IUserDB | null>;
  register(identifier: string, password: string): Promise<IUserDB>;
  deleteByIdentifier(identifier: string): Promise<boolean>;
  deleteByUserId(userId: string): Promise<boolean>;
}
