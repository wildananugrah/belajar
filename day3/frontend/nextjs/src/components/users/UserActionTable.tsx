import Link from "next/link";

const UserActionTable = ({
  current,
  index,
  setCurrentUser,
  editModal,
  setEditModal,
  deleteModal,
  setDeleteModal,
}: {
  current: any;
  index: number;
  setCurrentUser: any;
  editModal: boolean;
  setEditModal: any;
  deleteModal: boolean;
  setDeleteModal: any;
}) => {
  return (
    <div className="flex flex-row items-center space-x-2">
      <Link
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setEditModal(!editModal);
          setCurrentUser(current);
        }}
        data-cyid={`editTodoLink-${index}`}
        className="text-blue-700 hover:underline"
        href="#"
      >
        Edit
      </Link>
      <Link
        className="text-red-600 hover:underline"
        href="#"
        data-cyid={`deleteTodoLink-${index}`}
        onClick={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          setDeleteModal(!deleteModal);
          setCurrentUser(current);
        }}
      >
        Delete
      </Link>
    </div>
  );
};

export default UserActionTable;
