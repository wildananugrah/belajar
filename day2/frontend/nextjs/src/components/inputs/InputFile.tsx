import { ChangeEventHandler, Dispatch, SetStateAction } from "react";

const InputFile = ({
  label,
  Set,
  id,
}: {
  label: string;
  Set: ChangeEventHandler<HTMLInputElement>;
  id: string;
}) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <label
        htmlFor={id}
        className="flex flex-row justify-center items-center space-x-4 border rounded-lg p-2 text-sm shadow w-full cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
          />
        </svg>
        <p>{label}</p>
      </label>
      <input
        id={id}
        data-cyid={id}
        type="file"
        onChange={Set}
        className="hidden"
      />
    </div>
  );
};

export default InputFile;
