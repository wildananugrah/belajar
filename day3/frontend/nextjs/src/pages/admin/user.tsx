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

const User = () => {
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
          href={`/admin/user/attr?userId=${current.id}`}
        >
          {current.identifier}
        </Link>
      ),
    },
    {
      label: <p>Action</p>,
      key: "action",
      action: (current: any, index: number) => (
        <UserActionTable
          setCurrentUser={setCurrentUser}
          deleteModal={DeleteModal}
          setDeleteModal={setDeleteModal}
          editModal={EditModal}
          setEditModal={setEditModal}
          current={current}
          index={index}
        />
      ),
    },
  ];
  useEffect(() => {
    initUserLoad(setUsers);
  }, []);
  return (
    <DashboardLayout contentTitle="User Management">
      <div>User Management</div>
      <div className="w-full flex flex-row justify-end p-2" data-cyid="wrapper">
        <AddButton
          href="#"
          onClick={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
            setSuccessMessage(undefined);
            setErrorMessage(undefined);
            setAddModal(!AddModal);
          }}
          data-cyid="addTodoButton"
          label="Add User"
        />
      </div>
      <AppTable headers={todoHeaders} items={Users} />
      <AppModal id="addModal" show={AddModal} setShow={setAddModal}>
        <AddUserForm
          identifier={Identifier}
          password={Password}
          successMessage={SuccessMessage}
          errorMessage={ErrorMessage}
          setIdentifier={setIdentifier}
          setPassword={setPassword}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
          setUsers={setUsers}
        />
      </AppModal>
      <AppModal id="deleteModal" show={DeleteModal} setShow={setDeleteModal}>
        <DeleteUserConfirm
          currentUser={CurrentUser}
          users={Users}
          setUsers={setUsers}
          setDeleteModal={setDeleteModal}
        />
      </AppModal>
      <AppModal id="editModal" show={EditModal} setShow={setEditModal}>
        <EditPasswordUserForm
          current={CurrentUser}
          password={Password}
          successMessage={SuccessMessage}
          errorMessage={ErrorMessage}
          setPassword={setPassword}
          setErrorMessage={setErrorMessage}
          setSuccessMessage={setSuccessMessage}
        />
      </AppModal>
    </DashboardLayout>
  );
};

export default User;
