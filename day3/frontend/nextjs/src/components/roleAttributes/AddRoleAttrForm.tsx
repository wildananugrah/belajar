import { addRoleFunc } from "@/helpers/role.helper";
import InfoMessage from "../commons/InfoMessage";
import {
  addRoleAttributeFunc,
  attributeOptions,
} from "@/helpers/role-attr.helper";
import { useEffect } from "react";

const AddRoleAttrForm = ({
  module,
  attributes,
  roleId,
  successMessage,
  errorMessage,
  setModule,
  setSuccessMessage,
  setErrorMessage,
  setModules,
  setAttributes,
}: {
  module: string;
  attributes: string;
  roleId: string;
  successMessage: string | undefined;
  errorMessage: string | undefined;
  setModule: any;
  setSuccessMessage: any;
  setErrorMessage: any;
  setModules: any;
  setAttributes: any;
}) => {
  useEffect(() => {
    setAttributes("view");
  }, []);
  return (
    <div className="flex flex-col w-full space-y-3">
      <div id="title">
        <p>Add modal</p>
      </div>
      <div className="flex flex-col w-full space-y-2">
        <label htmlFor="moduleName">
          <p className="text-sm">Module Name:</p>
        </label>
        <input
          id="moduleName"
          type="text"
          value={module}
          onChange={(e) => setModule(e.target.value)}
          data-cyid="moduleInput"
          className="border rounded-xl p-2 text-sm"
        />
      </div>
      <div className="flex flex-col w-full space-y-2">
        <label htmlFor="attribute">
          <p className="text-sm">Attribute</p>
        </label>
        <select
          className="border rounded-xl p-2 text-sm bg-white"
          onChange={(e) => setAttributes(e.target.value)}
        >
          {attributeOptions.map((attrOption: any, index: number) => (
            <option key={index} value={attrOption}>
              {attrOption}
            </option>
          ))}
        </select>
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
          await addRoleAttributeFunc(
            module,
            attributes,
            roleId,
            setSuccessMessage,
            setErrorMessage,
            setModules
          );
        }}
        className="border rounded-xl bg-blue-600 w-full text-sm text-white p-2 active:bg-blue-700"
      >
        Add Role
      </button>
    </div>
  );
};

export default AddRoleAttrForm;
