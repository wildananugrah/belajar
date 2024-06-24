import { trace } from "@opentelemetry/api";
import { IRoleAttributeService } from "../dependencies/irole-attribute.service";
import { LogicException } from "../exceptions/logic.exception";

export class RoleAttribute {
  private roleAttrService: IRoleAttributeService;
  constructor({ roleAttrService }: { roleAttrService: IRoleAttributeService }) {
    this.roleAttrService = roleAttrService;
  }
  async create(
    appName: string,
    attributeName: string,
    roleId: string
  ): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.roleAttrService.insert");
    const dbRoleAttr = await this.roleAttrService.insert(
      appName,
      attributeName,
      roleId
    );
    span.end();
    return {
      status: true,
      data: dbRoleAttr,
    };
  }

  async list(roleId: string): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.roleAttrService.list");
    if (roleId === "") throw new LogicException(400, "roleId is empty!");
    const roleAttrList = await this.roleAttrService.list(roleId);
    span.end();
    return {
      status: true,
      data: roleAttrList,
    };
  }

  async detail(id: string): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.roleAttrService.detail");
    const roleAttrDb = await this.roleAttrService.detail(id);
    span.end();
    return { status: true, data: roleAttrDb };
  }

  async update(
    appName: string,
    attributeName: string,
    id: string
  ): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.roleAttrService.update");
    const roleAttrDb = await this.roleAttrService.update(
      appName,
      attributeName,
      id
    );
    span.end();
    return {
      status: true,
      data: roleAttrDb,
    };
  }

  async delete(id: string): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.roleAttrService.delete");
    const roleAttrDb = await this.roleAttrService.delete(id);
    span.end();
    return { status: true, data: roleAttrDb };
  }
}
