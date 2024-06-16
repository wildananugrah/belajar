import AppModal from "@/components/commons/AppModal";
import AppTable from "@/components/commons/AppTable";
import InfoMessage from "@/components/commons/InfoMessage";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { errorHandler } from "@/helpers/common.helper";
import { JWT_TOKEN_KEY } from "@/helpers/const.helper";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Todos = () => {
  const [AddModal, setAddModal] = useState<boolean>(false);
  const [EditModal, setEditModal] = useState<boolean>(false);
  const [DeleteModal, setDeleteModal] = useState<boolean>(false);
  const [TodoItems, setTodoItems] = useState<any[]>([]);
  const [CurrentTodo, setCurrentTodo] = useState<any>({});
  const [Name, setName] = useState<string>("");
  const [Description, setDescription] = useState<string>("");
  const [ErrorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [SuccessMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const todoHeaders = [
    {
      label: <p>Name</p>,
      key: "name",
    },
    {
      label: <p>Description</p>,
      key: "description",
    },
    {
      label: <p>Action</p>,
      key: "action",
      action: (currentTodo: any, index: number) => (
        <div className="flex flex-row items-center space-x-2">
          <Link
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setCurrentTodo(currentTodo);
              setName(currentTodo.name);
              setDescription(currentTodo.description);
              setEditModal(!EditModal);
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
              setCurrentTodo(currentTodo);
              setDeleteModal(!DeleteModal);
            }}
          >
            Delete
          </Link>
        </div>
      ),
    },
  ];
  async function initLoad() {
    try {
      const config = {
        url: "/api/todo",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem(JWT_TOKEN_KEY)}`,
        },
      };
      const response = await axios.request(config);
      setTodoItems(response.data);
    } catch (error: any) {
      errorHandler(error, setErrorMessage);
    }
  }
  useEffect(() => {
    initLoad();
  }, []);
  return (
    <DashboardLayout contentTitle="todos">
      <div className="w-full flex flex-row justify-end p-2" data-cyid="wrapper">
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setName("");
            setDescription("");
            setAddModal(!AddModal);
          }}
          data-cyid="addTodoButton"
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
          <p>Add Todo</p>
        </Link>
      </div>
      <AppTable headers={todoHeaders} items={TodoItems} />
      <AppModal id="addModal" show={AddModal} setShow={setAddModal}>
        <div className="flex flex-col w-full space-y-3">
          <div id="title">
            <p>Add modal</p>
          </div>
          <div className="flex flex-col w-full space-y-2">
            <label htmlFor="name">
              <p className="text-sm">Name:</p>
            </label>
            <input
              type="text"
              data-cyid="nameTodoInput"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-xl p-2 text-sm"
            />
          </div>
          <div className="flex flex-col w-full space-y-2">
            <label htmlFor="name">
              <p className="text-sm">Description:</p>
            </label>
            <input
              type="text"
              data-cyid="descriptionTodoInput"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-xl p-2 text-sm"
            />
          </div>
          <InfoMessage
            successMessage={SuccessMessage}
            errorMessage={ErrorMessage}
          />
          <button
            data-cyid="addTodoButtonSubmit"
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              try {
                const config = {
                  url: "/api/todo",
                  method: "POST",
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem(
                      JWT_TOKEN_KEY
                    )}`,
                    "Content-Type": "application/json",
                  },
                  data: JSON.stringify({
                    name: Name,
                    description: Description,
                  }),
                };
                const response = await axios.request(config);
                setSuccessMessage("Todo has been created successfully");
                setTodoItems(currentItems => [...currentItems, response.data]);
              } catch (error: any) {
                errorHandler(error, setErrorMessage);
              }
            }}
            className="border rounded-xl bg-blue-600 w-full text-sm text-white p-2 active:bg-blue-700"
          >
            Add Todo
          </button>
        </div>
      </AppModal>
      <AppModal id="editModal" show={EditModal} setShow={setEditModal}>
        <div className="flex flex-col w-full space-y-3">
          <div id="title">
            <p>Add modal</p>
          </div>
          <div className="flex flex-col w-full space-y-2">
            <label htmlFor="name">
              <p className="text-sm">Name:</p>
            </label>
            <input
              data-cyid="nameTodoEditInput"
              type="text"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-xl p-2 text-sm"
            />
          </div>
          <div className="flex flex-col w-full space-y-2">
            <label htmlFor="name">
              <p className="text-sm">Description:</p>
            </label>
            <input
              data-cyid="descriptionTodoEditInput"
              type="text"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-xl p-2 text-sm"
            />
          </div>
          <button
            data-cyid="editTodoButtonSubmit"
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              try {
                const response = await axios.request({
                  url: `/api/todo?id=${CurrentTodo.id}`,
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem(
                      JWT_TOKEN_KEY
                    )}`,
                  },
                  data: JSON.stringify({
                    name: Name,
                    description: Description,
                  }),
                });
                setTodoItems((currentItems) =>
                  currentItems.map((cTodoItem) => {
                    if (cTodoItem.id === CurrentTodo.id) {
                      cTodoItem.name = Name;
                      cTodoItem.description = Description;
                    }
                    return cTodoItem;
                  })
                );
                setSuccessMessage("Todo has been updated!");
              } catch (error) {
                errorHandler(error, setErrorMessage);
              }
            }}
            className="border rounded-xl bg-blue-600 w-full text-sm text-white p-2 active:bg-blue-700"
          >
            Edit Todo
          </button>
        </div>
      </AppModal>
      <AppModal id="deleteModal" show={DeleteModal} setShow={setDeleteModal}>
        <div className="flex flex-col justify-center items-center w-full space-y-3">
          <p>
            Are you sure you want to delete <b>{CurrentTodo.name}</b> ?
          </p>
          <div className="flex flex-row justify-between items-center w-full space-x-2">
            <button
              className="border rounded-xl bg-red-600 text-white p-2 w-full"
              data-cyid="deleteTodoButton"
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                setTodoItems((currentItems) =>
                  currentItems.filter(
                    (cTodoItem) => cTodoItem.id !== CurrentTodo.id
                  )
                );
                try {
                  await axios.request({
                    url: `/api/todo?id=${CurrentTodo.id}`,
                    method: "DELETE",
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem(
                        JWT_TOKEN_KEY
                      )}`,
                    },
                  });
                } catch (error: any) {
                  errorHandler(error, setErrorMessage);
                }
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
      </AppModal>
    </DashboardLayout>
  );
};

export default Todos;
