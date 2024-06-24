import fs from "fs";
import { IJWTService } from "../ijwt.service";
import jwt from "jsonwebtoken";
import { JwtException } from "../../exceptions/jwt.exception";

export class JWTService implements IJWTService {
  privateKey: string | undefined;
  certificate: string | undefined;

  constructor({
    privateKey,
    certificate,
  }: {
    privateKey: string;
    certificate: string;
  }) {
    this.privateKey = privateKey;
    this.certificate = certificate;
  }

  async create(data: any, expired: number): Promise<any> {
    try {
      if (this.privateKey === undefined) return;
      let pKey = fs.readFileSync(this.privateKey);
      let token = jwt.sign(data, pKey, {
        algorithm: "RS256",
        expiresIn: expired,
      });
      return { token, expired };
    } catch (error: any) {
      throw new JwtException(500, error.message);
    }
  }
  async refresh(token: string, expired: number): Promise<any> {
    try {
      const data = await this.validate(token);
      delete data.iat;
      delete data.exp;
      return await this.create(data, expired);
    } catch (error: any) {
      throw new JwtException(500, error.message);
    }
  }
  async validate(token: string): Promise<any> {
    try {
      if (this.certificate === undefined)
        throw new JwtException(400, "certificate is undefined");
      var cert = fs.readFileSync(this.certificate);
      return new Promise((resolve, reject) => {
        jwt.verify(
          token,
          cert,
          { algorithms: ["RS256"] },
          (err, decoded: any) => {
            if (err) reject(err);
            else {
              delete decoded.iat;
              delete decoded.exp;
              resolve(decoded);
            }
          }
        );
      });
    } catch (error: any) {
      if (error instanceof JwtException) {
        throw new JwtException(error.code, error.message);
      }
      throw new JwtException(500, error.message);
    }
  }
}
