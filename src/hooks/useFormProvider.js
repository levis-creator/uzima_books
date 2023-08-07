import { useContext } from "react";
import { FormContext } from "../context/FormContext.jsx";

const useFormProvider = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw Error("Form context not used correctly");
  }
  return context;
};
export default useFormProvider;
