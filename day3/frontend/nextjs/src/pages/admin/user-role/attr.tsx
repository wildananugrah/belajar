import AppTable from "@/components/commons/AppTable";
import NotificationPopUp from "@/components/commons/NotificationPopUp";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { initRoleLoad } from "@/helpers/role.helper";
import { addUserRoleBulk, getUserRole } from "@/helpers/user-role.helper";
import { detailUser } from "@/helpers/user.helper";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UserRoleAttr = () => {
  const [User, setUser] = useState<any>();
  const [UserId, setUserId] = useState<string>("");
  const [Roles, setRoles] = useState<any>([]);
  const [NotifShowUp, setNotifShowUp] = useState<boolean>(false);
  const [NotifMessage, setNotifMessage] = useState<string>("");
  const [UserRoles, setUserRoles] = useState<any[]>([]);
  const [RolesChecked, setRolesChecked] = useState<string[]>([]);
  const [ErrorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [SuccessMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const router = useRouter();
  const moduleHeaders = [
    {
      label: <p>Role Name</p>,
      key: "roleName",
      action: (current: any, index: number) => {
        return (
          <div className="flex flex-row space-x-2">
            <input
              type="checkbox"
              checked={RolesChecked.some((userRole) => userRole === current.id)}
              value={current.id}
              onChange={(e) => {
                e.preventDefault();
                e.stopPropagation();
                RolesChecked.includes(e.target.value)
                  ? setRolesChecked((current: any) =>
                      RolesChecked.filter(
                        (cRole: any) => cRole !== e.target.value
                      )
                    )
                  : setRolesChecked((current: any) => [
                      ...current,
                      e.target.value,
                    ]);
              }}
            />
            <p>{current.roleName}</p>
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    const { userId = undefined } = router.query;
    if (userId !== undefined && !Array.isArray(userId)) {
      detailUser(userId, setUser);
      initRoleLoad(setRoles);
      setUserId(userId);
      getUserRole(userId, setUserRoles, setRolesChecked);
    }
  }, [router]);
  return (
    <DashboardLayout
      contentTitle={`User Role Attribute - ${
        User !== undefined ? User.identifier : ""
      }`}
    >
      <div className="flex flex-col space-y-5 w-full">
        <div>User attribute : {User !== undefined ? User.identifier : ""}</div>
        <Link
          href="/admin/user-role"
          className="underline text-blue-600 text-sm"
        >
          &lt; Back
        </Link>
        <AppTable headers={moduleHeaders} items={Roles} />
        <div className="flex flex-row justify-end">
          <button
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              await addUserRoleBulk(
                UserId,
                RolesChecked,
                NotifShowUp,
                setNotifShowUp,
                setNotifMessage,
                setErrorMessage
              );
            }}
            className="bg-blue-600 text-sm text-white rounded-xl p-2 border w-40 active:bg-blue-700"
          >
            Update Roles
          </button>
        </div>
      </div>
      <NotificationPopUp show={NotifShowUp} message={NotifMessage} />
    </DashboardLayout>
  );
};

export default UserRoleAttr;
