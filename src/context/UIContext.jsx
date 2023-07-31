import { createContext, useState } from "react";

export const UIContext = createContext();

export const UIContextProvider = ({ children }) => {
  const [admin, setAdmin] = useState(false);

  return (
    <UIContext.Provider value={{ admin, setAdmin }}>
      {children}
    </UIContext.Provider>
  );
};
