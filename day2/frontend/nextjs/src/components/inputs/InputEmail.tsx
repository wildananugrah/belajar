import { Dispatch, SetStateAction } from "react";

const InputEmail = ({
  label,
  value,
  Set,
  id,
}: {
  label: string;
  value: string;
  Set: Dispatch<SetStateAction<string>>;
  id: string;
}) => {
  return (
    <div className="flex flex-col space-y-2 w-full">
      <label htmlFor={id}>
        <p className="text-sm">{label}: </p>
      </label>
      <input
        id={id}
        data-cyid={id}
        type="text"
        value={value}
        onChange={(e) => Set(e.target.value)}
        className="border rounded-xl p-2 w-full text-gray-600"
      />
    </div>
  );
};

export default InputEmail;
