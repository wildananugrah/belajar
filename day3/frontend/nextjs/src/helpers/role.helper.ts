import axios from "axios";
import { JWT_TOKEN_KEY } from "./const.helper";
import { errorHandler } from "./common.helper";

export const addRoleFunc = async (
  roleName: string,
  setSuccessMessage: any,
  setErrorMessage: any,
  setRoles: any
) => {
  setSuccessMessage(undefined);
  setErrorMessage(undefined);
  try {
    const response = await axios.request({
      url: "/api/role",
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        roleName: roleName,
      }),
    });
    setRoles((current: any) => [...current, response.data.data]);
    setSuccessMessage("Role has been created successfully");
  } catch (error: any) {
    errorHandler(error, setErrorMessage);
  }
};

export const editRoleFunc = async (
  roleName: string,
  setSuccessMessage: any,
  setErrorMessage: any,
  roleId: string
) => {
  setSuccessMessage(undefined);
  setErrorMessage(undefined);
  try {
    await axios.request({
      url: `/api/role?roleId=${roleId}`,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        roleName: roleName,
      }),
    });
    setSuccessMessage("Role Name has been updated successfully");
  } catch (error: any) {
    errorHandler(error, setErrorMessage);
  }
};

export const initRoleLoad = async (setRoles: any) => {
  try {
    const response = await axios.request({
      url: "/api/role",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
        "Content-Type": "application/json",
      },
    });
    setRoles(response.data.data);
  } catch (error: any) {
    errorHandler(error, (message: any) => {});
  }
};

export const detailRole = async (id: string, setRole: any) => {
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

export const deleteRole = async (id: string) => {
  try {
    const response = await axios.request({
      url: `/api/role?roleId=${id}`,
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
