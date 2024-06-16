import { trace } from "@opentelemetry/api";
import { IUserService, UserType } from "../dependencies/iuser-service";

export class User {
  private userService: IUserService;
  constructor({ userService }: { userService: IUserService }) {
    this.userService = userService;
  }
  async login(username: string, password: string): Promise<object | undefined> {
    try {
      const tracer = trace.getTracer("default");
      const span = tracer.startSpan("this.userService.login query db");
      const dbUser = await this.userService.login(username);
      span.end();
      const span2 = tracer.startSpan("this.userService.login validation 1");
      if (dbUser === null) throw new Error("Username not found");
      span2.end()
      const span3 = tracer.startSpan("this.userService.login validation 2");
      if (dbUser.password !== password) throw new Error("Password invalid");
      span3.end();
      return dbUser;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async register(username: string, password: string): Promise<UserType | null> {
    try {
      return await this.userService.register(username, password);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
