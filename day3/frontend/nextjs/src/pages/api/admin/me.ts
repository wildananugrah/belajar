import { backendService } from "@/configs/common.config";
import { MethodHandler } from "@/helpers/common.type";
import { trace } from "@opentelemetry/api";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

const getHandler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const tracer = trace.getTracer("default");
    const span = tracer.startSpan("me.getHandler");
    const token = req.headers.authorization?.split(" ")[1];
    const config = {
      url: `${backendService}/_/admin/me`,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.request(config);
    span.end();
    res.status(200).send(response.data);
  } catch (error: any) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};

const methodHandlers: MethodHandler = {
  GET: getHandler,
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
