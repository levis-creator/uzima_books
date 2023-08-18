import { AnimatePresence, easeIn, motion } from "framer-motion";
import useAuthContext from "../../hooks/useAuthContext";
import useUiContext from "../../hooks/useUiContext";

const DropDown = ({ isOpen }) => {
  const list = "px-3 py-2 hover:bg-slate-50 active:bg-slate-50";
  const { signOut, isAdmin } = useAuthContext();
  const { setAdmin } = useUiContext();
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute bg-white shadow-md z-10 right-1 w-32 rounded-md"
            initial={{
              opacity: 0,
              y: -50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -50,
            }}
            transition={{
              ease: easeIn,
            }}
          >
            <ul className="cursor-pointer">
              {isAdmin && (
                <li
                  className={`${list}`}
                  onClick={() => setAdmin((data) => !data)}
                >
                  Switch View
                </li>
              )}
              <li className={`${list}`} onClick={signOut}>
                Sign out
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default DropDown;
