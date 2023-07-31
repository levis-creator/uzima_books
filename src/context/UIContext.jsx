import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UIContext = createContext();

export const UIContextProvider = ({ children }) => {
  const [admin, setAdmin] = useState(false);

  return (
    <UIContext.Provider value={{ admin, setAdmin }}>
      {children}
    </UIContext.Provider>
  );
};
