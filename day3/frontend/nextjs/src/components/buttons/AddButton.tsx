import Link from "next/link";

const AddButton = (props: any) => {
  return (
    <Link
      {...props}
      className="border shadow rounded-xl py-2 px-5 text-sm flex flex-row justify-center items-center space-x-2 active:bg-gray-100"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4.5v15m7.5-7.5h-15"
        />
      </svg>
      <p>{props.label}</p>
    </Link>
  );
};

export default AddButton;
