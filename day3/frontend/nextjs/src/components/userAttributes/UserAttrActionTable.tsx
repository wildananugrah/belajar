import Link from "next/link";

const UserAttributeActionTable = ({
  current,
  index,
  setCurrent,
  editModal,
  setEditModal,
  deleteModal,
  setDeleteModal,
  setSuccessMessage,
  setErrorMessage,
}: {
  current: any;
  index: number;
  setCurrent: any;
  editModal: boolean;
  setEditModal: any;
  deleteModal: boolean;
  setDeleteModal: any;
  setSuccessMessage: any;
  setErrorMessage: any;
}) => {
  return (
    <div className="flex flex-row items-center space-x-2">
      <Link
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setEditModal(!editModal);
          setCurrent(current);
          setErrorMessage(undefined);
          setSuccessMessage(undefined);
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
          setCurrent(current);
          setErrorMessage(undefined);
          setSuccessMessage(undefined);
        }}
      >
        Delete
      </Link>
    </div>
  );
};

export default UserAttributeActionTable;
