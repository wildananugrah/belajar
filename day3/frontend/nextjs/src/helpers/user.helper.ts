import axios from "axios";
import { JWT_TOKEN_KEY } from "./const.helper";
import { errorHandler } from "./common.helper";

export const addUserFunc = async (
  identifier: string,
  password: string,
  setSuccessMessage: any,
  setErrorMessage: any,
  setUsers: any
) => {
  setSuccessMessage(undefined);
  setErrorMessage(undefined);
  try {
    const response = await axios.request({
      url: "/api/user",
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        identifier: identifier,
        password: password,
      }),
    });
    setUsers((current: any) => [...current, response.data.data]);
    setSuccessMessage("User has been created successfully");
  } catch (error: any) {
    errorHandler(error, setErrorMessage);
  }
};

export const editPasswordUserFunc = async (
  password: string,
  setSuccessMessage: any,
  setErrorMessage: any,
  userId: string
) => {
  setSuccessMessage(undefined);
  setErrorMessage(undefined);
  try {
    await axios.request({
      url: `/api/user?userId=${userId}`,
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        password: password,
      }),
    });
    setSuccessMessage("User Password has been updated successfully");
  } catch (error: any) {
    errorHandler(error, setErrorMessage);
  }
};

export const initUserLoad = async (setUsers: any) => {
  try {
    const response = await axios.request({
      url: "/api/user",
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
        "Content-Type": "application/json",
      },
    });
    setUsers(response.data.data);
  } catch (error: any) {
    errorHandler(error, (message: any) => {});
  }
};

export const detailUser = async (id: string, setUser: any) => {
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

export const deleteUser = async (id: string) => {
  try {
    const response = await axios.request({
      url: `/api/user?userId=${id}`,
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
