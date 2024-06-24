import fp from "fastify-plugin";
import { JWTService } from "../dependencies/impl/jwt.service";
import { IJWTService } from "../dependencies/ijwt.service";
import { certificate, privateKey } from "../configs/jwt.config";

export default fp(async (app, options) => {
  const jwtService: IJWTService = new JWTService({
    privateKey: privateKey,
    certificate: certificate,
  });
  app.decorate("jwtService", jwtService);
});
