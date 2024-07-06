import { DatabaseException } from "../exceptions/database.exception";
import { LogicException } from "../exceptions/logic.exception";

export function errorResponseHandler(error: any, res: any): any {
  if (error instanceof LogicException)
    return res.status(error.code).send({ message: error.message });
  if (error instanceof DatabaseException)
    return res.status(error.code).send({ message: error.message });
  return res.status(500).send({ message: error.message });
}
