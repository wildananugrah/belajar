import AddButton from "@/components/buttons/AddButton";
import AppModal from "@/components/commons/AppModal";
import AppTable from "@/components/commons/AppTable";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AddRoleForm from "@/components/roles/AddRoleForm";
import DeleteRoleConfirm from "@/components/roles/DeleteRoleConfirm";
import EditRoleForm from "@/components/roles/EditRoleForm";
import RoleActionTable from "@/components/roles/RoleActionTable";
import { initRoleLoad } from "@/helpers/role.helper";
import Link from "next/link";
import { useEffect, useState } from "react";

const Role = () => {
  const [AddModal, setAddModal] = useState<boolean>(false);
  const [DeleteModal, setDeleteModal] = useState<boolean>(false);
  const [EditModal, setEditModal] = useState<boolean>(false);
  const [CurrentRole, setCurrentRole] = useState<any>(undefined);
  const [RoleName, setRoleName] = useState<string>("");
  const [ErrorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [SuccessMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const [Roles, setRoles] = useState<any>([]);
  const roleHeaders = [
    {
      label: <p>Role Name</p>,
      key: "roleName",
      action: (current: any, index: number) => (
        <Link
          className="text-blue-600 underline"
          href={`/admin/role/attr?roleId=${current.id}`}
        >
          {current.roleName}
        </Link>
      ),
    },
    {
      label: <p>Action</p>,
      key: "action",
      action: (current: any, index: number) => (
        <RoleActionTable
          setCurrent={setCurrentRole}
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
    initRoleLoad(setRoles);
  }, []);
  return (
    <DashboardLayout contentTitle="Role Management">
      <div>Role Management</div>
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
          label="Add Role"
        />
      </div>
      <AppTable headers={roleHeaders} items={Roles} />
      <AppModal id="addModal" show={AddModal} setShow={setAddModal}>
        <AddRoleForm
          roleName={RoleName}
          successMessage={SuccessMessage}
          errorMessage={ErrorMessage}
          setRoleName={setRoleName}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
          setRoles={setRoles}
        />
      </AppModal>
      <AppModal id="deleteModal" show={DeleteModal} setShow={setDeleteModal}>
        <DeleteRoleConfirm
          current={CurrentRole}
          items={Roles}
          setItems={setRoles}
          setDeleteModal={setDeleteModal}
        />
      </AppModal>
      <AppModal id="editModal" show={EditModal} setShow={setEditModal}>
        <EditRoleForm
          current={CurrentRole}
          roleName={RoleName}
          successMessage={SuccessMessage}
          errorMessage={ErrorMessage}
          setRoleName={setRoleName}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
          items={Roles}
          setItems={setRoles}
        />
      </AppModal>
    </DashboardLayout>
  );
};

export default Role;
