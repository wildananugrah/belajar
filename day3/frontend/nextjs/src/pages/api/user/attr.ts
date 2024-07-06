import { backendService } from "@/configs/common.config";
import { MethodHandler } from "@/helpers/common.type";
import { trace } from "@opentelemetry/api";
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
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("role.attr.postHandler");
    const { module, attributes, userId } = req.body;
    const response = await axios.request({
      url: `${backendService}/user/attr`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.headers.authorization?.split(" ")[1]}`,
      },
      data: JSON.stringify({
        module,
        attributes,
        userId,
      }),
    });
    span.end();
    res.status(200).send(response.data);
  } catch (error: any) {
    return apiErrorHandler(error, res);
  }
};

const getHandler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { userAttributeId = undefined, userId = undefined } = req.query;
  try {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("role.attr.getHandler");
    const url = `${backendService}/user/attr${
      userId === undefined ? "" : `?userId=${userId}`
    }${userAttributeId === undefined ? "" : `/${userAttributeId}`}`;
    const response = await axios.request({
      url: url,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.headers.authorization?.split(" ")[1]}`,
      },
    });
    span.end();
    res.status(200).send(response.data);
  } catch (error: any) {
    return apiErrorHandler(error, res);
  }
};

const putHandler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const { userAttributeId = undefined } = req.query;
  const { module, attributes } = req.body;
  try {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("role.attr.putHandler");
    const response = await axios.request({
      url: `${backendService}/user/attr/${userAttributeId}`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.headers.authorization?.split(" ")[1]}`,
      },
      data: JSON.stringify({ module, attributes }),
    });
    span.end();
    res.status(200).send(response.data);
  } catch (error: any) {
    return apiErrorHandler(error, res);
  }
};

const deleteHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<any>
) => {
  const { userAttrId = undefined } = req.query;
  try {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("role.attr.deleteHandler");
    const response = await axios.request({
      url: `${backendService}/user/attr/${userAttrId}`,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${req.headers.authorization?.split(" ")[1]}`,
      },
    });
    span.end();
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
