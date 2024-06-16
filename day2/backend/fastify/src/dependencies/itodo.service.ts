import { ITodoDB } from "../helpers/types/todo-db.dto";

export interface ITodoService {
  insert(name: string, description: string, userId: string): Promise<ITodoDB>;
  list(userId: string): Promise<ITodoDB[]>;
  detail(id: string): Promise<ITodoDB>;
  delete(id: string): Promise<boolean>;
  update(name: string, description: string, id: string): Promise<boolean>;
}
