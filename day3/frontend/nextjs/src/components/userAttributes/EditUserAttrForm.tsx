import { attributeOptions } from "@/helpers/user-attr.helper";
import { editUserAttributeFunc } from "@/helpers/user-attr.helper";
import { useEffect } from "react";
import InfoMessage from "../commons/InfoMessage";

const EditUserAttrForm = ({
  current,
  module,
  attributes,
  successMessage,
  errorMessage,
  setSuccessMessage,
  setErrorMessage,
  items,
  setItems,
  setModule,
  setAttributes,
}: {
  current: any;
  module: string;
  attributes: string;
  successMessage: string | undefined;
  errorMessage: string | undefined;
  setSuccessMessage: any;
  setErrorMessage: any;
  items: any[];
  setItems: any;
  setModule: any;
  setAttributes: any;
}) => {
  useEffect(() => {
    setModule(current !== undefined ? current.module : "");
    setAttributes(current !== undefined ? current.attributes[0] : "");
  }, [current, setModule, setAttributes]);
  return (
    <div className="flex flex-col w-full space-y-3">
      <div id="title">
        <p>Edit modal</p>
      </div>
      <div className="flex flex-col w-full space-y-2">
        <label htmlFor="name">
          <p className="text-sm">Module Name:</p>
        </label>
        <input
          type="text"
          value={module}
          onChange={(e) => setModule(e.target.value)}
          data-cyid="userNameEditInput"
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
          <option value="">--select attribute--</option>
          {current !== undefined &&
            attributeOptions.map((attrOption: any, index: number) => (
              <option
                selected={current.attributes.includes(attrOption)}
                key={index}
                value={attrOption}
              >
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
          await editUserAttributeFunc(
            module,
            attributes,
            setSuccessMessage,
            setErrorMessage,
            current.id
          );
          setItems((currentItems: any) =>
            items.map((cItem: any) => {
              if (cItem.id === current.id) {
                cItem.module = module;
                cItem.attributes = [attributes];
              }
              return cItem;
            })
          );
        }}
        className="border rounded-xl bg-blue-600 w-full text-sm text-white p-2 active:bg-blue-700"
      >
        Update Module
      </button>
    </div>
  );
};

export default EditUserAttrForm;
