import { appPassword, appUsername } from "../configs/common.config";
import { jwtExpired } from "../configs/jwt.config";
import { IJWTService } from "../dependencies/ijwt.service";
import { LogicException } from "../exceptions/logic.exception";
import { comparePassword } from "../helpers/bcrypt.helper";

export class Admin {
  private jwtService: IJWTService;
  constructor({ jwtService }: { jwtService: IJWTService }) {
    this.jwtService = jwtService;
  }
  async login(username: string, password: string) {
    if (username !== appUsername)
      throw new LogicException(400, "invalid username");
    if (!(await comparePassword(password, appPassword)))
      throw new LogicException(400, "invalid password");
    return this.jwtService.create({ username }, jwtExpired);
  }
  async validate(token: string) {
    return this.jwtService.validate(token);
  }
  async refresh(token: string) {
    return this.jwtService.refresh(token, jwtExpired);
  }
}
