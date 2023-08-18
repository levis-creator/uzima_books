import { createContext, useState } from "react";

export const UIContext = createContext();

export const UIContextProvider = ({ children }) => {
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [confirmAlert, setConfirmAlert] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(null);
  return (
    <UIContext.Provider
      value={{
        admin,
        setAdmin,
        loading,
        setLoading,
        confirmAlert,
        setConfirmAlert,
        isConfirmed,
        setIsConfirmed,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
