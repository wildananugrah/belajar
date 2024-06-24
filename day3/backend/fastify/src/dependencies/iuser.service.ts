import { IUserDB } from "../helpers/types/user-db.dto";

export interface IUserService {
  insert(identifier: string, password: string): Promise<IUserDB>;
  selectByIdentifier(identifier: string): Promise<IUserDB>;
  selectById(userId: string): Promise<IUserDB>;
  list(): Promise<IUserDB[]>;
  updatePassword(password: string, userId: string): Promise<boolean>;
  deleteByUserId(userId: string): Promise<boolean>;
}
