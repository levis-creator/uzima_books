import { createContext, useState } from "react";

export const UIContext = createContext();

export const UIContextProvider = ({ children }) => {
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <UIContext.Provider value={{ admin, setAdmin, loading, setLoading }}>
      {children}
    </UIContext.Provider>
  );
};
