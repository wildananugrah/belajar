import { trace } from "@opentelemetry/api";
import { IRoleService } from "../dependencies/irole.service";

export class Role {
  private roleService: IRoleService;
  constructor({ roleService }: { roleService: IRoleService }) {
    this.roleService = roleService;
  }
  async create(roleName: string): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.roleService.insert");
    const dbRole = await this.roleService.insert(roleName);
    span.end();
    return {
      status: true,
      data: dbRole,
    };
  }

  async list(): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.roleService.list");
    const roleList = await this.roleService.list();
    span.end();
    return {
      status: true,
      data: roleList,
    };
  }

  async detail(id: string): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.roleService.detail");
    const roleDb = await this.roleService.detail(id);
    span.end();
    return { status: true, data: roleDb };
  }

  async update(roleName: string, id: string): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.roleService.update");
    const roleDb = await this.roleService.update(roleName, id);
    span.end();
    return {
      status: true,
      data: roleDb,
    };
  }

  async delete(id: string): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.roleService.delete");
    const roleDb = await this.roleService.delete(id);
    span.end();
    return { status: true, data: roleDb };
  }
}
