import { BiErrorCircle } from "react-icons/bi";
const ErrorAlert = ({ error, message }) => {
  return (
    <>
      {error && (
        <span className="bg-red-100 flex  items-center gap-2 p-2 px rounded-md text-red-600">
          <div className="">
            <BiErrorCircle />
          </div>
          <div className="text-red-500 text-sm">{message}</div>
        </span>
      )}
    </>
  );
};
export default ErrorAlert;
