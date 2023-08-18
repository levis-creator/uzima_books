import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

export const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");
  // error display
  const handleAlert = (message) => {
    setIsVisible(true);
    setMessage(message);
    setTimeout(() => setIsVisible(false), 5000);
  };
  return (
    <FormContext.Provider
      value={{ error, message, handleAlert, setError, setIsVisible, isVisible }}
    >
      <Outlet />
    </FormContext.Provider>
  );
};
export default FormProvider;
