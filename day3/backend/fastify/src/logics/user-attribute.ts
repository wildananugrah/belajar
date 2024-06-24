import { trace } from "@opentelemetry/api";
import { IUserAttributeService } from "../dependencies/iuser-attribute.service";

export class UserAttribute {
  private userAttrService: IUserAttributeService;
  constructor({ userAttrService }: { userAttrService: IUserAttributeService }) {
    this.userAttrService = userAttrService;
  }
  async create(
    appName: string,
    attributeName: string,
    userId: string
  ): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userAttrService.insert");
    const rolAttrDb = await this.userAttrService.insert(
      appName,
      attributeName,
      userId
    );
    span.end();
    return {
      status: true,
      data: rolAttrDb,
    };
  }

  async list(userId: string): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userAttrService.list");
    const roleAttrList = await this.userAttrService.list(userId);
    span.end();
    return {
      status: true,
      data: roleAttrList,
    };
  }

  async detail(id: string): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userAttrService.detail");
    const roleAttrDb = await this.userAttrService.detail(id);
    span.end();
    return { status: true, data: roleAttrDb };
  }

  async update(
    appName: string,
    attributeName: string,
    id: string
  ): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userAttrService.update");
    const userAttrDb = await this.userAttrService.update(
      appName,
      attributeName,
      id
    );
    span.end();
    return {
      status: true,
      data: userAttrDb,
    };
  }

  async delete(id: string): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userAttrService.delete");
    const userAttrDb = await this.userAttrService.delete(id);
    span.end();
    return { status: true, data: userAttrDb };
  }
}
