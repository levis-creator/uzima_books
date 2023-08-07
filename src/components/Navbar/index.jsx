import { useState } from "react";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import { nav_items } from "../../api/local/nav_item";
import avatar from "../../assets/avatar.png";
import useAuthContext from "../../hooks/useAuthContext";
import useUiContext from "../../hooks/useUiContext";
import NavbarModel from "./NavbarModel";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { admin } = useUiContext();
  const { pathname } = useLocation();
  const { isLogin, currentUser } = useAuthContext();
  const conditional_visible =
    pathname == "/signup" || pathname == "/login" || admin ? "hidden" : "";
  //closing function
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavbarModel isVisible={isOpen} handleClose={handleOpen} />
      <header className="bg-white py-6 px-4 shadow-md rounded-b-2xl sm:px-8 w-full">
        <nav className="w-full gap-5 flex items-center justify-between">
          {!admin && (
            <button onClick={handleOpen} className="text-xl">
              <AiOutlineMenu />
            </button>
          )}
          <div className="flex-1">
            <div className=" w-24">
              <img
                src={nav_items.logo}
                alt={nav_items.alt}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <div className={`text-3xl text-slate-500 ${conditional_visible}`}>
              <AiOutlineSearch />
            </div>

            {!isLogin && (
              <Link to="/signup" className={`${conditional_visible}`}>
                <button className="bg-theme-color2 shadow-md text-white px-3 py-3 rounded-full ">
                  Login/Signup
                </button>
              </Link>
            )}
            {isLogin && (
              <div className="h-12 w-12 rounded-full overflow-hidden">
                <img
                  src={
                    currentUser.photoURL != null ? currentUser.photoURL : avatar
                  }
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
