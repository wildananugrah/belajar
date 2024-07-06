import { trace } from "@opentelemetry/api";
import { IUserService } from "../dependencies/iuser.service";
import { hashPassword } from "../helpers/common.helper";

export class User {
  private userService: IUserService;
  constructor({ userService }: { userService: IUserService }) {
    this.userService = userService;
  }

  async create(identifier: string, password: string): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userService.insert");
    const dbUser = await this.userService.insert(
      identifier,
      await hashPassword(password)
    );
    span.end();
    return {
      status: true,
      data: dbUser,
    };
  }

  async list(): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userService.list");
    const dbUser = await this.userService.list();
    span.end();
    return {
      status: true,
      data: dbUser,
    };
  }

  async detail(userId: string): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userService.selectById");
    const dbResult = await this.userService.selectById(userId);
    span.end();
    return { status: true, data: dbResult };
  }

  async updatePassword(password: string, userId: string) {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userService.updatePassword");
    const dbResult = await this.userService.updatePassword(
      await hashPassword(password),
      userId
    );
    span.end();
    return { status: true };
  }

  async delete(userId: string): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userService.deleteByUserId");
    const dbResult = await this.userService.deleteByUserId(userId);
    span.end();
    return { status: true };
  }
}
