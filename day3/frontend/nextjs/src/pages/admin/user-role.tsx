import AddButton from "@/components/buttons/AddButton";
import AppModal from "@/components/commons/AppModal";
import AppTable from "@/components/commons/AppTable";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AddUserForm from "@/components/users/AddUserForm";
import DeleteUserConfirm from "@/components/users/DeleteUserConfirm";
import EditPasswordUserForm from "@/components/users/EditPasswordUserForm";
import UserActionTable from "@/components/users/UserActionTable";
import { initUserLoad } from "@/helpers/user.helper";
import Link from "next/link";
import { useEffect, useState } from "react";

const UserRole = () => {
  const [AddModal, setAddModal] = useState<boolean>(false);
  const [DeleteModal, setDeleteModal] = useState<boolean>(false);
  const [EditModal, setEditModal] = useState<boolean>(false);
  const [CurrentUser, setCurrentUser] = useState<any>(undefined);
  const [Identifier, setIdentifier] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [ErrorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [SuccessMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const [Users, setUsers] = useState<any>([]);
  const todoHeaders = [
    {
      label: <p>Identifier</p>,
      key: "identifier",
      action: (current: any, index: number) => (
        <Link
          className="text-blue-600 underline"
          href={`/admin/user-role/attr?userId=${current.id}`}
        >
          {current.identifier}
        </Link>
      ),
    },
  ];
  useEffect(() => {
    initUserLoad(setUsers);
  }, []);
  return (
    <DashboardLayout contentTitle="User Role Management">
      <div className="flex flex-col space-y-5">
        <div>User Role Management</div>
        <AppTable headers={todoHeaders} items={Users} />
      </div>
    </DashboardLayout>
  );
};

export default UserRole;
