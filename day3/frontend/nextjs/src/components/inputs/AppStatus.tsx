import React from "react";

const AppStatus = ({
  id,
  label,
  status,
  setStatus,
}: {
  id: string;
  label?: string;
  status: boolean;
  setStatus: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex flex-col w-full space-y-2">
      {label !== undefined && (
        <label htmlFor={id} className="font-bold text-sm">
          {label}
        </label>
      )}
      <div
        id={id}
        className={`flex flex-row border w-10 ${
          status
            ? "justify-end bg-blue-300 border-blue-300"
            : "justify-start bg-gray-300 border-gray-300"
        } rounded-full w-8 cursor-pointer`}
        onClick={(e) => {
          setStatus(!status);
        }}
      >
        <div
          className={`border rounded-full h-4 w-4 ${
            status
              ? "bg-blue-500 border-blue-600"
              : "bg-gray-500 border-gray-600"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default AppStatus;
