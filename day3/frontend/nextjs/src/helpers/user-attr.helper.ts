import axios from "axios";
import { JWT_TOKEN_KEY } from "./const.helper";
import { errorHandler } from "./common.helper";

export const attributeOptions = ["view", "edit"];

export const addUserAttributeFunc = async (
  module: string,
  attributes: string,
  userId: string,
  setSuccessMessage: any,
  setErrorMessage: any,
  setModules: any
) => {
  setSuccessMessage(undefined);
  setErrorMessage(undefined);
  try {
    const response = await axios.request({
      url: "/api/user/attr",
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        module,
        userId,
        attributes: [attributes],
      }),
    });
    setModules((current: any) => [...current, response.data.data]);
    setSuccessMessage("User Attribute has been created successfully");
  } catch (error: any) {
    errorHandler(error, setErrorMessage);
  }
};

export const editUserAttributeFunc = async (
  module: string,
  attributes: string,
  setSuccessMessage: any,
  setErrorMessage: any,
  userAttributeId: string
) => {
  setSuccessMessage(undefined);
  setErrorMessage(undefined);
  try {
    await axios.request({
      url: `/api/user/attr?userAttributeId=${userAttributeId}`,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        module,
        attributes: [attributes],
      }),
    });
    setSuccessMessage("User Attr has been updated successfully");
  } catch (error: any) {
    errorHandler(error, setErrorMessage);
  }
};

export const initUserAttributeLoad = async (
  userId: string,
  setUserAttributes: any
) => {
  try {
    const response = await axios.request({
      url: `/api/user/attr?userId=${userId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
        "Content-Type": "application/json",
      },
    });
    setUserAttributes(response.data.data);
  } catch (error: any) {
    errorHandler(error, (message: any) => {});
  }
};

export const detailUserAttribute = async (id: string, setUser: any) => {
  try {
    const response = await axios.request({
      url: `/api/user?userId=${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
        "Content-Type": "application/json",
      },
    });
    setUser(response.data.data);
  } catch (error: any) {
    errorHandler(error, (message: any) => {});
  }
};

export const deleteUserAttribute = async (id: string) => {
  try {
    await axios.request({
      url: `/api/user/attr?userAttrId=${id}`,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    errorHandler(error, (message: any) => {});
  }
};
