import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw Error("Auth context not used correctly");
  }
  return context;
};

export default useAuthContext;
