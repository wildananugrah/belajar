import { trace } from "@opentelemetry/api";
import { IUserService } from "../dependencies/iuser.service";
import { IJWTService, IToken } from "../dependencies/ijwt";
import { jwtExpired } from "../configs/jwt.config";
import { IUserDB } from "../helpers/types/user-db.dto";

export class User {
  private userService: IUserService;
  private jwtService: IJWTService;
  constructor({
    userService,
    jwtService,
  }: {
    userService: IUserService;
    jwtService: IJWTService;
  }) {
    this.userService = userService;
    this.jwtService = jwtService;
  }
  async login(identifier: string, password: string): Promise<IToken> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userService.login");
    const dbUser = await this.userService.login(identifier);
    if (dbUser === null) throw new Error("Identifier not found");
    if (dbUser.password !== password) throw new Error("Password invalid");
    const token = await this.jwtService.create(dbUser, jwtExpired);
    span.end();
    return token;
  }

  async register(identifier: string, password: string): Promise<IToken> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userService.register");
    const dbUser = await this.userService.register(identifier, password);
    const token = await this.jwtService.create(dbUser, jwtExpired);
    span.end();
    return token;
  }

  async me(token: string): Promise<IUserDB> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userService.me");
    const userDb: IUserDB = await this.jwtService.validate(token);
    span.end();
    return userDb;
  }

  async delete(token: string): Promise<boolean> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userService.register");
    const userDb: IUserDB = await this.jwtService.validate(token);
    const userId = userDb.id;
    const dbResult = await this.userService.deleteByUserId(userId);
    span.end();
    return dbResult;
  }
}
