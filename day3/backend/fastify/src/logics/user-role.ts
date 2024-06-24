import { trace } from "@opentelemetry/api";
import { IUserRoleService } from "../dependencies/iuser-role.service";

export class UserRole {
  private userRoleService: IUserRoleService;
  constructor({ userRoleService }: { userRoleService: IUserRoleService }) {
    this.userRoleService = userRoleService;
  }
  async updateRoleBulk(userId: string, roleIds: string[]) {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userRoleService.updateRoleBulk");
    await this.userRoleService.deleteByUserId(userId);
    await this.userRoleService.insertBulk(userId, roleIds);
    span.end();
    return {
      status: true,
    };
  }
  async insert(userId: string, roleId: string): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userRoleService.insert");
    const dbResult = await this.userRoleService.insert(userId, roleId);
    span.end();
    return {
      status: true,
      data: dbResult,
    };
  }
  async userRoleAttr(userId: string): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userRoleService.userRoleAttr");
    const dbResult = await this.userRoleService.userRoleAttr(userId);
    span.end();
    return {
      status: true,
      data: dbResult,
    };
  }
  async list(userId: string): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userRoleService.list");
    const dbResult = await this.userRoleService.list(userId);
    span.end();
    return {
      status: true,
      data: dbResult,
    };
  }
  async delete(id: string): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userRoleService.delete");
    const dbResult = await this.userRoleService.delete(id);
    span.end();
    return {
      status: true,
      data: dbResult,
    };
  }
}
