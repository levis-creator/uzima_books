import { useContext } from "react";
import { UIContext } from "../context/UIContext";

const useUiContext = () => {
  const context = useContext(UIContext);
  if (!context) {
    throw Error("ui context used wrongly");
  }
  return context;
};

export default useUiContext;
