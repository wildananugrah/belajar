export interface IHealthcheckService {
  healthcheck(): Promise<boolean>;
}
