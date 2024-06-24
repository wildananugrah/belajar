import { deleteUser } from "@/helpers/user.helper";

const DeleteUserConfirm = ({
  currentUser,
  users,
  setUsers,
  setDeleteModal,
}: {
  currentUser: any;
  users: any;
  setUsers: any;
  setDeleteModal: any;
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full space-y-3">
      <p>
        Are you sure you want to delete{" "}
        <b>{currentUser !== undefined ? currentUser.identifier : ""}</b> ?
      </p>
      <div className="flex flex-row justify-between items-center w-full space-x-2">
        <button
          className="border rounded-xl bg-red-600 text-white p-2 w-full"
          data-cyid="deleteTodoButton"
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            setUsers((current: any) =>
              users.filter((cUser: any) => cUser.id !== currentUser.id)
            );
            deleteUser(currentUser.id);
            setDeleteModal(false);
          }}
        >
          delete
        </button>
        <button
          className="border rounded-xl w-full p-2"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDeleteModal(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteUserConfirm;
