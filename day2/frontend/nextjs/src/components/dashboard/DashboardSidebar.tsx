import Link from "next/link";
import { useRouter } from "next/router";

const DashboardSidebar = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex flex-row justify-center items-center p-2 h-28 bg-gray-800">
        <p className="text-white">Logo</p>
      </div>
      <ul className="bg-gray-800 text-white flex flex-col space-y-5 p-2 text-sm h-full">
        <li className="flex flex-row items-center space-x-2">
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
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>

          <Link href="/admin/dashboard" className="hover:underline">
            Home
          </Link>
        </li>
        <li className="flex flex-row items-center space-x-2">
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
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
          <Link
            data-cyid="todosMenuLink"
            href="/admin/todos"
            className="hover:underline"
          >
            <p>Todos</p>
          </Link>
        </li>
        <li className="w-full border border-t-0 border-gray-700"></li>
        <li className="flex flex-row items-center space-x-2">
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
              d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
            />
          </svg>
          <Link
            data-cyid="signoutMenuLink"
            href="/logout"
            className="hover:underline"
          >
            Sign Out
          </Link>
        </li>
      </ul>
      <div className="flex flex-row justify-center items-center p-2 h-16 bg-gray-800">
        <p className="text-white text-sm">Powered By Floothink</p>
      </div>
    </div>
  );
};

export default DashboardSidebar;
