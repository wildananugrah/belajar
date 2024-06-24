import InfoMessage from "../commons/InfoMessage";
import { addUserFunc, editPasswordUserFunc } from "@/helpers/user.helper";

const EditPasswordUserForm = ({
  current,
  password,
  successMessage,
  errorMessage,
  setPassword,
  setSuccessMessage,
  setErrorMessage,
}: {
  current: any;
  password: string;
  successMessage: string | undefined;
  errorMessage: string | undefined;
  setPassword: any;
  setSuccessMessage: any;
  setErrorMessage: any;
}) => {
  return (
    <div className="flex flex-col w-full space-y-3">
      <div id="title">
        <p>Edit Password modal</p>
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
          await editPasswordUserFunc(password, setSuccessMessage, setErrorMessage, current.id);
        }}
        className="border rounded-xl bg-blue-600 w-full text-sm text-white p-2 active:bg-blue-700"
      >
        Add User
      </button>
    </div>
  );
};

export default EditPasswordUserForm;
