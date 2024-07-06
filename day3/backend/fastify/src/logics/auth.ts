import { trace } from "@opentelemetry/api";
import { IJWTService } from "../dependencies/ijwt.service";
import { IUserRoleService } from "../dependencies/iuser-role.service";
import { IUserService } from "../dependencies/iuser.service";
import { comparePassword } from "../helpers/common.helper";
import { LogicException } from "../exceptions/logic.exception";
import { jwtExpired } from "../configs/jwt.config";

export class Auth {
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
  async login(identifier: string, password: string, user_uuid: string): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userService.login");
    
    span.setAttribute("user_uuid", user_uuid);
    const dbResult = await this.userService.selectByIdentifier(identifier);
    if (!(await comparePassword(password, dbResult.password)))
      throw new LogicException(400, "Invalid password");
    const userRoleDb = await this.userRoleService.list(dbResult.id);
    const userRoleAttrDb = await this.userRoleService.userRoleAttr(dbResult.id);
    const userRoleUpdated = userRoleDb.map((userRole) => userRole.roleName);
    const userAttrUpdated = userRoleAttrDb.map((userRoleAttr) => ({
      [userRoleAttr.module]: userRoleAttr.attributes,
    }));
    const compiled = {
      roles: userRoleUpdated,
      attr: userAttrUpdated,
    };
    console.log(compiled);
    const token = await this.jwtService.create({ data: compiled }, jwtExpired);
    span.end();
    return { status: true, data: token };
  }
  async getUserAttr(token: string) {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userService.getUserAttr");
    const decodedToken = await this.jwtService.validate(token);
    span.end();
    return { status: true, data: decodedToken.data };
  }
  async userAccessValidation(module: string, token: string): Promise<any> {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("this.userService.userAccessValidation");
    const decodedToken = await this.jwtService.validate(token);
    const _module = decodedToken.data.attr.find((_module: any) =>
      _module.hasOwnProperty(module)
    );
    if (_module === undefined)
      throw new LogicException(401, "You are not allowed!");
    span.end();
    return { status: true, data: _module };
  }
}
