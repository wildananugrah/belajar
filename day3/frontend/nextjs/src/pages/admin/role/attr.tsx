import AddButton from "@/components/buttons/AddButton";
import AppModal from "@/components/commons/AppModal";
import AppTable from "@/components/commons/AppTable";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AddRoleAttrForm from "@/components/roleAttributes/AddRoleAttrForm";
import DeleteRoleAttrConfirm from "@/components/roleAttributes/DeleteRoleAttrConfirm";
import EditRoleAttrForm from "@/components/roleAttributes/EditRoleAttrForm";
import RoleAttributeActionTable from "@/components/roleAttributes/RoleAttrActionTable";
import { initRoleAttributeLoad } from "@/helpers/role-attr.helper";
import { detailRole } from "@/helpers/role.helper";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const RoleAttr = () => {
  const router = useRouter();
  const [Role, setRole] = useState<any>(undefined);
  const [AddModal, setAddModal] = useState<boolean>(false);
  const [DeleteModal, setDeleteModal] = useState<boolean>(false);
  const [EditModal, setEditModal] = useState<boolean>(false);
  const [Modules, setModules] = useState<any>([]);
  const [RoleId, setRoleId] = useState<string>("");
  const [Module, setModule] = useState<string>("");
  const [Attributes, setAttributes] = useState<string>("");
  const [CurrentRoleAttribute, setCurrentRoleAttribute] =
    useState<any>(undefined);
  const [ErrorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [SuccessMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const roleAttributeHeaders = [
    {
      label: <p>Module</p>,
      key: "module",
    },
    {
      label: <p>Attributes</p>,
      key: "attributes",
      action: (current: any, index: number) => {
        return <p className="capitalize">{current.attributes.join(", ")}</p>;
      },
    },
    {
      label: <p>Action</p>,
      key: "action",
      action: (current: any, index: number) => (
        <RoleAttributeActionTable
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
          setCurrent={setCurrentRoleAttribute}
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
    const { roleId = undefined } = router.query;
    if (roleId !== undefined && !Array.isArray(roleId)) {
      detailRole(roleId, setRole);
      initRoleAttributeLoad(roleId, setModules);
      setRoleId(roleId);
    }
  }, [router]);
  return (
    <DashboardLayout
      contentTitle={`Role Attribute - ${
        Role !== undefined ? Role.roleName : ""
      }`}
    >
      <div>Role : {Role !== undefined ? Role.roleName : ""}</div>
      <div
        className="w-full flex flex-row justify-between items-center p-2"
        data-cyid="wrapper"
      >
        <Link href="/admin/role" className="underline text-blue-600">
          &lt; back
        </Link>
        <AddButton
          href=""
          onClick={(e: any) => {
            e.preventDefault();
            e.stopPropagation();
            setSuccessMessage(undefined);
            setErrorMessage(undefined);
            setAddModal(!AddModal);
          }}
          data-cyid="addTodoButton"
          label="Add Module"
        />
      </div>
      <AppTable headers={roleAttributeHeaders} items={Modules} />
      <AppModal id="addModal" show={AddModal} setShow={setAddModal}>
        <AddRoleAttrForm
          module={Module}
          attributes={Attributes}
          roleId={RoleId}
          successMessage={SuccessMessage}
          errorMessage={ErrorMessage}
          setModule={setModule}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
          setModules={setModules}
          setAttributes={setAttributes}
        />
      </AppModal>
      <AppModal id="deleteModal" show={DeleteModal} setShow={setDeleteModal}>
        <DeleteRoleAttrConfirm
          current={CurrentRoleAttribute}
          items={Modules}
          setItems={setModules}
          setDeleteModal={setDeleteModal}
        />
      </AppModal>
      <AppModal id="editModal" show={EditModal} setShow={setEditModal}>
        <EditRoleAttrForm
          current={CurrentRoleAttribute}
          module={Module}
          attributes={Attributes}
          successMessage={SuccessMessage}
          errorMessage={ErrorMessage}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
          items={Modules}
          setItems={setModules}
          setModule={setModule}
          setAttributes={setAttributes}
        />
      </AppModal>
    </DashboardLayout>
  );
};

export default RoleAttr;
