import { BiCheckCircle } from "react-icons/bi";
import { BiErrorCircle } from "react-icons/bi";
const FormAlert = ({ error, message, isVisible }) => {
  return (
    <>
      {isVisible && (
        <span
          className={`${
            error ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
          } flex  items-center gap-2 p-2 px rounded-md `}
        >
          <div className="">
            {error ? <BiErrorCircle /> : <BiCheckCircle />}
          </div>
          <div className=" text-sm">{message}</div>
        </span>
      )}
    </>
  );
};
export default FormAlert;
