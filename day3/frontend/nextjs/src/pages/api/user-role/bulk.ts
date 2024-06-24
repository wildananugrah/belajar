import { backendService } from "@/configs/common.config";
import { MethodHandler } from "@/helpers/common.type";
import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const apiErrorHandler = (error: any, res: any) => {
  if (error instanceof AxiosError) {
    return res.status(error.response?.status || 500).send({
      statusCode: error.response?.status || 500,
      message: error.response?.data.message,
    });
  }
  return res.status(500).json({ statusCode: 500, message: error.message });
};

const postHandler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const { roleIds } = req.body;
    const { userId } = req.query;
    const response = await axios.request({
      url: `${backendService}/user/role/${userId}/bulk`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.headers.authorization?.split(" ")[1]}`,
      },
      data: JSON.stringify({
        roleIds,
      }),
    });
    res.status(200).send(response.data);
  } catch (error: any) {
    return apiErrorHandler(error, res);
  }
};

const methodHandlers: MethodHandler = {
  POST: postHandler
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { method } = req;
  // Check if the method is a key in methodHandlers
  if (method && Object.prototype.hasOwnProperty.call(methodHandlers, method)) {
    const handle = methodHandlers[method];
    return handle(req, res);
  }
  res.setHeader("Allow", Object.keys(methodHandlers));
  res.status(405).end(`Method ${method} Not Allowed`);
}
