import axios from "axios";
import { errorHandler } from "./common.helper";
import { JWT_TOKEN_KEY } from "./const.helper";

export async function addUserRoleBulk(
  userId: string,
  roleIds: string[],
  notifShowUp: boolean,
  setNotifShowUp: any,
  setNotifMessage: any,
  setErrorMessage: any
) {
  setNotifMessage("");
  setErrorMessage(undefined);
  try {
    await axios.request({
      url: `/api/user-role/bulk?userId=${userId}`,
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        roleIds,
      }),
    });
    setNotifShowUp(!notifShowUp);
    setNotifMessage("User Role has been updated successfully");
  } catch (error: any) {
    errorHandler(error, setErrorMessage);
  }
}
export async function getUserRole(
  userId: string,
  setUserRoles: any,
  setRolesChecked: any
) {
  try {
    const response = await axios.request({
      url: `/api/user-role?userId=${userId}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
        "Content-Type": "application/json",
      },
    });
    setUserRoles(response.data.data);
    setRolesChecked(response.data.data.map((userRole: any) => userRole.roleId));
  } catch (error: any) {
    errorHandler(error, () => {});
  }
}
export async function getuserRoleAttr(userId: string) {}
export async function deleteUserRole(userRoleId: string) {}
