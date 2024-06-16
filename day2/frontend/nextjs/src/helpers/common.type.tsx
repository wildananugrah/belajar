import { NextApiRequest, NextApiResponse } from "next";

export type MethodHandler = {
  [key: string]: (req: NextApiRequest, res: NextApiResponse) => void;
};
