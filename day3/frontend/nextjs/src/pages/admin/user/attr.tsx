import AddButton from "@/components/buttons/AddButton";
import AppModal from "@/components/commons/AppModal";
import AppTable from "@/components/commons/AppTable";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AddUserAttrForm from "@/components/userAttributes/AddUserAttrForm";
import DeleteUserAttrConfirm from "@/components/userAttributes/DeleteUserAttrConfirm";
import EditUserAttrForm from "@/components/userAttributes/EditUserAttrForm";
import UserAttributeActionTable from "@/components/userAttributes/UserAttrActionTable";
import { initUserAttributeLoad } from "@/helpers/user-attr.helper";
import { detailUser } from "@/helpers/user.helper";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const UserAttr = () => {
  const router = useRouter();
  const [User, setUser] = useState<any>();

  const [AddModal, setAddModal] = useState<boolean>(false);
  const [DeleteModal, setDeleteModal] = useState<boolean>(false);
  const [EditModal, setEditModal] = useState<boolean>(false);
  const [Modules, setModules] = useState<any>([]);
  const [UserId, setUserId] = useState<string>("");
  const [Module, setModule] = useState<string>("");
  const [Attributes, setAttributes] = useState<string>("");
  const [CurrentUserAttribute, setCurrentUserAttribute] =
    useState<any>(undefined);
  const [ErrorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [SuccessMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const userAttributeHeaders = [
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
        <UserAttributeActionTable
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessage}
          setCurrent={setCurrentUserAttribute}
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
    const { userId = undefined } = router.query;
    if (userId !== undefined && !Array.isArray(userId)) {
      detailUser(userId, setUser);
      initUserAttributeLoad(userId, setModules);
      setUserId(userId);
    }
  }, [router]);
  return (
    <DashboardLayout
      contentTitle={`User Attribute - ${
        User !== undefined ? User.identifier : ""
      }`}
    >
      <div>User attribute : {User !== undefined ? User.identifier : ""}</div>
      <div
        className="w-full flex flex-row justify-between items-center p-2"
        data-cyid="wrapper"
      >
        <Link href="/admin/user" className="underline text-blue-600">
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
      <AppTable headers={userAttributeHeaders} items={Modules} />
      <AppModal id="addModal" show={AddModal} setShow={setAddModal}>
        <AddUserAttrForm
          module={Module}
          attributes={Attributes}
          userId={UserId}
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
        <DeleteUserAttrConfirm
          current={CurrentUserAttribute}
          items={Modules}
          setItems={setModules}
          setDeleteModal={setDeleteModal}
        />
      </AppModal>
      <AppModal id="editModal" show={EditModal} setShow={setEditModal}>
        <EditUserAttrForm
          current={CurrentUserAttribute}
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

export default UserAttr;
