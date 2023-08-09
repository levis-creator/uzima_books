import { useContext } from "react";
import { DataContext } from "../context/DataContext";

const useDataProvider = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw Error("Data context not used correctly");
  }
  return context;
};

export default useDataProvider;
