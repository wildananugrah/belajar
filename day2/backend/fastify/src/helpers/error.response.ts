import { DatabaseException } from "../exceptions/database.exception";

export function errorResponseHandler(error: any, res: any): any {
  return error instanceof DatabaseException
    ? res.status(error.code).send({ message: error.message })
    : res.status(500).send({ message: error.message });
}
