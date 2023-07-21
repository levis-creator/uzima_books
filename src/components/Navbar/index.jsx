import { AiOutlineMenu } from "react-icons/ai";
import NavbarModel from "./NavbarModel";
import { useState } from "react";
import { nav_items } from "../../api/local/nav_item";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  //closing function
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <NavbarModel isVisible={isOpen} handleClose={handleOpen} />
      <header className="bg-white py-6 px-4 shadow-md rounded-b-2xl">
        <nav className="w-full gap-5 flex items-center justify-between">
          <button onClick={handleOpen} className="text-xl">
            <AiOutlineMenu />
          </button>
          <div className="flex-1">
            <div className=" w-36">
              <img
                src={nav_items.logo}
                alt={nav_items.alt}
                className="w-full h-auto"
              />
            </div>
          </div>
          <button className="bg-theme-color2 shadow-md text-white px-3 py-3 rounded-full ">
            Login/Signup
          </button>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
