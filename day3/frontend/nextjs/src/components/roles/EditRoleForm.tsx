import { editRoleFunc } from "@/helpers/role.helper";
import InfoMessage from "../commons/InfoMessage";
import { useEffect } from "react";

const EditRoleForm = ({
  current,
  roleName,
  successMessage,
  errorMessage,
  setRoleName,
  setSuccessMessage,
  setErrorMessage,
  items,
  setItems,
}: {
  current: any;
  roleName: string;
  successMessage: string | undefined;
  errorMessage: string | undefined;
  setRoleName: any;
  setSuccessMessage: any;
  setErrorMessage: any;
  items: any[];
  setItems: any;
}) => {
  useEffect(() => {
    setRoleName(current !== undefined ? current.roleName : "");
  }, [current]);
  return (
    <div className="flex flex-col w-full space-y-3">
      <div id="title">
        <p>Edit modal</p>
      </div>
      <div className="flex flex-col w-full space-y-2">
        <label htmlFor="name">
          <p className="text-sm">Role Name:</p>
        </label>
        <input
          type="text"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          data-cyid="roleNameEditInput"
          className="border rounded-xl p-2 text-sm"
        />
      </div>
      <InfoMessage
        successMessage={successMessage}
        errorMessage={errorMessage}
      />
      <button
        data-cyid="addTodoButtonSubmit"
        onClick={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          await editRoleFunc(
            roleName,
            setSuccessMessage,
            setErrorMessage,
            current.id
          );
          setItems((currentItems: any) =>
            items.map((cItem: any) => {
              if (cItem.id === current.id) {
                cItem.roleName = roleName;
              }
              return cItem;
            })
          );
        }}
        className="border rounded-xl bg-blue-600 w-full text-sm text-white p-2 active:bg-blue-700"
      >
        Add User
      </button>
    </div>
  );
};

export default EditRoleForm;
