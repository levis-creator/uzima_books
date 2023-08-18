import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiCheckCircle } from "react-icons/bi";
import useDataProvider from "../hooks/useDataProvider";
import useUiContext from "../hooks/useUiContext";

const Message = ({ message, icon, color }) => {
  return (
    <>
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div
          className={`text-3xl
                  ${color}
              `}
        >
          {icon}
        </div>
        <h2>{message}</h2>
      </motion.div>
    </>
  );
};

const ConfirmationAlert = ({ isVisible }) => {
  const { setConfirmAlert } = useUiContext();
  const { recievedData, deleteBook, success } = useDataProvider();

  const handleNo = () => {
    setConfirmAlert(false);
  };
  const handleYes = (e) => {
    e.preventDefault();

    deleteBook(recievedData.cover_page, recievedData.id);
    setTimeout(() => {
      setConfirmAlert(false);
    }, 3000);
  };
  return (
    <AnimatePresence>
      {isVisible && (
        <div
          onClick={handleNo}
          className="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-20 flex justify-center items-center"
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: -1,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: -1,
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-fit mx-10 p-5 rounded-lg"
          >
            {success == true || success == false ? (
              <Message
                icon={success ? <BiCheckCircle /> : <AiOutlineCloseCircle />}
                message={success ? "Success" : "Failed"}
                color={success ? "text-green-600" : "text-red-600"}
              />
            ) : (
              <motion.div
                className="w-full h-full"
                exit={{
                  opacity: 0,
                }}
              >
                <h2 className="font-bold">Are you sure you want to Delete?</h2>
                <div className="flex justify-end gap-2">
                  <button
                    className="bg-green-700 text-white px-3 py-1 rounded-lg"
                    onClick={handleYes}
                  >
                    Yes
                  </button>

                  <button
                    onClick={handleNo}
                    className="bg-red-700 text-white px-3 py-1 rounded-lg"
                  >
                    No
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationAlert;
