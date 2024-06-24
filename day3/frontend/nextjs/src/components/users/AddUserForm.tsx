import InfoMessage from "../commons/InfoMessage";
import { addUserFunc } from "@/helpers/user.helper";

const AddUserForm = ({
  identifier,
  password,
  successMessage,
  errorMessage,
  setIdentifier,
  setPassword,
  setSuccessMessage,
  setErrorMessage,
  setUsers
}: {
  identifier: string;
  password: string;
  successMessage: string | undefined;
  errorMessage: string | undefined;
  setIdentifier: any;
  setPassword: any;
  setSuccessMessage: any;
  setErrorMessage: any;
  setUsers: any;
}) => {
  return (
    <div className="flex flex-col w-full space-y-3">
      <div id="title">
        <p>Add modal</p>
      </div>
      <div className="flex flex-col w-full space-y-2">
        <label htmlFor="name">
          <p className="text-sm">Identifier:</p>
        </label>
        <input
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          data-cyid="nameTodoInput"
          className="border rounded-xl p-2 text-sm"
        />
      </div>
      <div className="flex flex-col w-full space-y-2">
        <label htmlFor="name">
          <p className="text-sm">Password:</p>
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          data-cyid="descriptionTodoInput"
          className="border rounded-xl p-2 text-sm"
        />
      </div>
      <div className="flex flex-col w-full space-y-2">
        <label htmlFor="name">
          <p className="text-sm">Re-Password:</p>
        </label>
        <input
          type="password"
          onChange={(e) => {
            setErrorMessage(undefined);
            if (e.target.value !== password) {
              setErrorMessage("Password and Re-Password are not matched");
            }
          }}
          data-cyid="descriptionTodoInput"
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
          addUserFunc(identifier, password, setSuccessMessage, setErrorMessage, setUsers);
        }}
        className="border rounded-xl bg-blue-600 w-full text-sm text-white p-2 active:bg-blue-700"
      >
        Add User
      </button>
    </div>
  );
};

export default AddUserForm;
