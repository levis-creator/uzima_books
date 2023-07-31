import { Navigate, Outlet } from "react-router-dom";
import useUiContext from "../hooks/useUiContext";

const ProtectAdmin = ({ children }) => {
  const { admin } = useUiContext();
  console.log(admin);
  if (!admin) {
    console.log(admin);
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default ProtectAdmin;
