const AppModal = ({
  show,
  setShow,
  children,
  id
}: {
  show: boolean;
  setShow: any;
  children: any;
  id: string;
}) => {
  return (
    <div
      id="modal"
      className={`fixed inset-0 bg-black bg-opacity-50 ${
        show ? "block" : "hidden"
      } overflow-y-auto h-full w-full`}
      aria-labelledby="modalTitle"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setShow(!show);
      }}
    >
      <div
        className="relative top-20 mx-auto p-5 border w-4/5 md:w-1/2 shadow-lg rounded-md bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          id="modalClose"
          data-cyid={`${id}-closeButton`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setShow(!show);
          }}
          className="flex bg-white rounded-full p-2 border cursor-pointer absolute -right-2 -top-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AppModal;
