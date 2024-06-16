export interface UserType {
  username: string;
  password: string;
  created_at: string;
  id: string;
}

export interface IUserService {
  login(username: string): Promise<UserType | null>;
  register(username: string, password: string): Promise<UserType | null>;
  deleteByUsername(username: string): Promise<any>;
}
