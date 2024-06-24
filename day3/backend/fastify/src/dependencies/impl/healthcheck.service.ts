import { Pool } from "pg";
import { IHealthcheckService } from "../ihealthcheck.service";

export class HealthCheckService implements IHealthcheckService {
  pool: Pool;
  constructor(pool: Pool) {
    this.pool = pool;
  }
  async healthcheck(): Promise<boolean> {
    const client = await this.pool.connect();
    try {
      await client.query("SELECT 1 as healtcheck");
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      client.release();
    }
  }
}
