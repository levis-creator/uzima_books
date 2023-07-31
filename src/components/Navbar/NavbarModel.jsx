import { AnimatePresence, motion } from "framer-motion";
import { menu_items } from "../../api/local/menu_items";
import { nav_items } from "../../api/local/nav_item";
import { Link } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

const NavbarModel = ({ isVisible, handleClose }) => {
  const { signout } = useAuthContext();
  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed  bottom-0 top-0 right-0 left-0 z-[2] bg-black bg-opacity-10"
            onClick={() => handleClose()}
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -50,
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className=" bg-theme-color2 w-1/2 h-full rounded-r-2xl px-4 pt-10 text-white"
            >
              {/* the svg has a view port of 1000 */}
              <img src={nav_items.model_logo} alt={nav_items.logo} />
              <ul className="text-lg capitalize space-y-4">
                {menu_items.map((items, i) => {
                  return (
                    <li key={i}>
                      <Link to={items.path} onClick={handleClose}>
                        {items.title}
                      </Link>
                    </li>
                  );
                })}
                <button
                  onClick={() => signout()}
                  className="bg-white text-theme-color1 rounded-full shadow-lg px-2"
                >
                  Sign out
                </button>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavbarModel;
