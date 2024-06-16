export interface IToken {
  token: string;
  expired: number;
}
export interface IJWTService {
  create(data: any, expired: number): Promise<IToken>;
  refresh(token: string, expired: number): Promise<IToken>;
  validate(token: string): Promise<any>;
}
