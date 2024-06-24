import { deleteUserAttribute } from "@/helpers/user-attr.helper";

const DeleteUserAttrConfirm = ({
  current,
  items,
  setItems,
  setDeleteModal,
}: {
  current: any;
  items: any;
  setItems: any;
  setDeleteModal: any;
}) => {
  return (
    <div className="flex flex-col justify-center items-center w-full space-y-3">
      <p>
        Are you sure you want to delete{" "}
        <b>{current !== undefined ? current.module : ""}</b> ?
      </p>
      <div className="flex flex-row justify-between items-center w-full space-x-2">
        <button
          className="border rounded-xl bg-red-600 text-white p-2 w-full"
          data-cyid="deleteUserAttrButton"
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            setItems((currentItem: any) =>
              items.filter((cItem: any) => cItem.id !== current.id)
            );
            deleteUserAttribute(current.id);
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

export default DeleteUserAttrConfirm;
