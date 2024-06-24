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
    const { roleName } = req.body;
    const response = await axios.request({
      url: `${backendService}/role`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.headers.authorization?.split(" ")[1]}`,
      },
      data: JSON.stringify({
        roleName,
      }),
    });
    res.status(200).send(response.data);
  } catch (error: any) {
    return apiErrorHandler(error, res);
  }
};

const getHandler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { roleId = undefined } = req.query;
  try {
    const response = await axios.request({
      url: `${backendService}/role${roleId === undefined ? "" : `/${roleId}`}`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.headers.authorization?.split(" ")[1]}`,
      },
    });
    res.status(200).send(response.data);
  } catch (error: any) {
    return apiErrorHandler(error, res);
  }
};

const putHandler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { roleId = undefined } = req.query;
  const { roleName } = req.body;
  try {
    const response = await axios.request({
      url: `${backendService}/role/${roleId}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.headers.authorization?.split(" ")[1]}`,
      },
      data: JSON.stringify({ roleName }),
    });
    res.status(200).send(response.data);
  } catch (error: any) {
    return apiErrorHandler(error, res);
  }
};

const deleteHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { roleId = undefined } = req.query;
  try {
    const response = await axios.request({
      url: `${backendService}/role/${roleId}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.headers.authorization?.split(" ")[1]}`,
      },
    });
    res.status(200).send(response.data);
  } catch (error: any) {
    return apiErrorHandler(error, res);
  }
};

const methodHandlers: MethodHandler = {
  POST: postHandler,
  GET: getHandler,
  PUT: putHandler,
  DELETE: deleteHandler,
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
