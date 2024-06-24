import Link from "next/link";

const DashboardHeader = ({ email }: { email: string }) => {
  return (
    <div className="h-24 bg-gray-800 flex flex-row justify-between">
      <div></div>
      <div className="w-48 flex flex-col justify-center items-center">
        <div className="flex flex-row justify-end pr-5 items-center space-x-3 w-full text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          <Link className="hover:underline" href="/admin/profile">
            {email}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
