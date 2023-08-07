import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

export const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  // error display
  const handleError = (message) => {
    setError(true);
    setMessage(message);
    setTimeout(() => setError(false), 5000);
  };
  return (
    <FormContext.Provider value={{ error, message, handleError }}>
      <Outlet />
    </FormContext.Provider>
  );
};
export default FormProvider;
