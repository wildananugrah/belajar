import axios from "axios";
import { JWT_TOKEN_KEY } from "./const.helper";
import { errorHandler } from "./common.helper";

export const attributeOptions = ["view", "edit"];

export const addRoleAttributeFunc = async (
  module: string,
  attributes: string,
  roleId: string,
  setSuccessMessage: any,
  setErrorMessage: any,
  setModules: any
) => {
  setSuccessMessage(undefined);
  setErrorMessage(undefined);
  try {
    const response = await axios.request({
      url: "/api/role/attr",
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        module,
        roleId,
        attributes: [attributes],
      }),
    });
    setModules((current: any) => [...current, response.data.data]);
    setSuccessMessage("Role Attribute has been created successfully");
  } catch (error: any) {
    errorHandler(error, setErrorMessage);
  }
};

export const editRoleAttributeFunc = async (
  module: string,
  attributes: string,
  setSuccessMessage: any,
  setErrorMessage: any,
  roleAttributeId: string
) => {
  setSuccessMessage(undefined);
  setErrorMessage(undefined);
  try {
    await axios.request({
      url: `/api/role/attr?roleAttributeId=${roleAttributeId}`,
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
    setSuccessMessage("Role Name has been updated successfully");
  } catch (error: any) {
    errorHandler(error, setErrorMessage);
  }
};

export const initRoleAttributeLoad = async (
  roleId: string,
  setRoleAttributes: any
) => {
  try {
    const response = await axios.request({
      url: `/api/role/attr?roleId=${roleId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
        "Content-Type": "application/json",
      },
    });
    setRoleAttributes(response.data.data);
  } catch (error: any) {
    errorHandler(error, (message: any) => {});
  }
};

export const detailRoleAttribute = async (id: string, setRole: any) => {
  try {
    const response = await axios.request({
      url: `/api/role?roleId=${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
        "Content-Type": "application/json",
      },
    });
    setRole(response.data.data);
  } catch (error: any) {
    errorHandler(error, (message: any) => {});
  }
};

export const deleteRoleAttribute = async (id: string) => {
  try {
    const response = await axios.request({
      url: `/api/role/attr?roleAttrId=${id}`,
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
