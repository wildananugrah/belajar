import { ButtonHTMLAttributes } from "react";

const PrimaryButton = ({
  label,
  Set,
  id,
}: {
  label: string;
  Set: React.MouseEventHandler<HTMLButtonElement>;
  id: string;
}) => {
  return (
    <button
      id={id}
      data-cyid={id}
      className="border rounded-xl p-2 text-sm text-white bg-blue-600 active:bg-blue-700"
      onClick={Set}
    >
      {label}
    </button>
  );
};

export default PrimaryButton;
