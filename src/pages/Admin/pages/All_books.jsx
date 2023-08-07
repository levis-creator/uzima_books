import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";

const All_books = () => {
  const navigate = useNavigate();
  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        All books
        <button
          className="bg-theme-color1 text-white px-2 py-2 rounded-full"
          onClick={() => navigate("/admin/add_book")}
        >
          Add book
        </button>
      </div>
      <div className="grid grid-cols-1 gap-2">
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
    </div>
  );
};

export default All_books;
