import { addRoleFunc } from "@/helpers/role.helper";
import InfoMessage from "../commons/InfoMessage";

const AddRoleForm = ({
  roleName,
  successMessage,
  errorMessage,
  setRoleName,
  setSuccessMessage,
  setErrorMessage,
  setRoles,
}: {
  roleName: string;
  successMessage: string | undefined;
  errorMessage: string | undefined;
  setRoleName: any;
  setSuccessMessage: any;
  setErrorMessage: any;
  setRoles: any;
}) => {
  return (
    <div className="flex flex-col w-full space-y-3">
      <div id="title">
        <p>Add modal</p>
      </div>
      <div className="flex flex-col w-full space-y-2">
        <label htmlFor="name">
          <p className="text-sm">Role Name:</p>
        </label>
        <input
          type="text"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          data-cyid="roleNameInput"
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
          await addRoleFunc(roleName, setSuccessMessage, setErrorMessage, setRoles);
        }}
        className="border rounded-xl bg-blue-600 w-full text-sm text-white p-2 active:bg-blue-700"
      >
        Add Role
      </button>
    </div>
  );
};

export default AddRoleForm;
