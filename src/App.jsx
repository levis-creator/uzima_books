import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectAdmin from "./components/ProtectAdmin";
import useUiContext from "./hooks/useUiContext";
import AccessDenied from "./pages/AccessDenied";
import Admin from "./pages/Admin";
import All_books from "./pages/Admin/pages/All_books";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Books from "./pages/books/Books";
import Home from "./pages/page";

function App() {
  const { admin } = useUiContext();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={admin ? <Navigate to="/admin" /> : <Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectAdmin />}>
          <Route path="/admin">
            <Route index element={<Admin />} />
            <Route path="all-books" element={<All_books />} />
          </Route>
        </Route>
        <Route path="/access-denied" element={<AccessDenied />} />
      </Routes>
    </>
  );
}

export default App;
