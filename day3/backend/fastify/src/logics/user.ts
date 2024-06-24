import { trace } from "@opentelemetry/api";
import { IUserService } from "../dependencies/iuser.service";
import { LogicException } from "../exceptions/logic.exception";
import { IUserRoleService } from "../dependencies/iuser-role.service";
import { IJWTService } from "../dependencies/ijwt.service";
import { jwtExpired } from "../configs/jwt.config";

export class User {
  private userService: IUserService;
  private userRoleService: IUserRoleService;
  private jwtService: IJWTService;
  constructor({
    userService,
    userRoleService,
    jwtService,
  }: {
    userService: IUserService;
    userRoleService: IUserRoleService;
    jwtService: IJWTService;
  }) {
    this.userService = userService;
    this.userRoleService = userRoleService;
    this.jwtService = jwtService;
  }

  async create(identifier: string, password: string): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userService.insert");
    const dbUser = await this.userService.insert(identifier, password);
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

  async login(identifier: string, password: string): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userService.login");
    const dbResult = await this.userService.selectByIdentifier(identifier);
    if (dbResult.password !== password)
      throw new LogicException(400, "Invalid password");
    const userRoleAttrDb = await this.userRoleService.userRoleAttr(dbResult.id);
    const userAttrUpdated = userRoleAttrDb.map((userRoleAttr) => ({
      module: userRoleAttr.module,
      attributes: userRoleAttr.attributes,
    }));
    const token = await this.jwtService.create(
      { data: userAttrUpdated },
      jwtExpired
    );
    span.end();
    return { status: true, data: token };
  }

  async userAccessValidation(module: string, token: string): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userService.login");
    const decodedToken = await this.jwtService.validate(token);
    const attribute = decodedToken.data.filter((data: any) => data.module === module)
    if(attribute.length === 0) throw new LogicException(401, "You are not allowed!");
    span.end();
    return { status: true, data: attribute};
  }

  async updatePassword(password: string, userId: string) {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userService.updatePassword");
    const dbResult = await this.userService.updatePassword(password, userId);
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
