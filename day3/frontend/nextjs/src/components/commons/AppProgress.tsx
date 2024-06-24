const AppProgress = ({ progress }: { progress: number }) => {
  return (
    <>
      <div id="progress-container" className="mt-4 w-full">
        <div
          id="progress-bar"
          className={`bg-blue-300 text-xs font-bold text-center p-0.5 leading-none border border-blue-700 rounded-md text-blue-800 ${
            progress > 0 ? "block" : "hidden"
          }`}
          style={{ width: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>
    </>
  );
};

export default AppProgress;
