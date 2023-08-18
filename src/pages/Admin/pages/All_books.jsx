import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useDataProvider from "../../../hooks/useDataProvider";
import BookCard from "../components/BookCard";
import useUiContext from "../../../hooks/useUiContext";
import Loading from "../../../components/Loading";
import ConfirmationAlert from "../../../components/ConfirmationAlert";

const All_books = () => {
  const navigate = useNavigate();
  const { loading, setLoading, confirmAlert } = useUiContext();
  // gets from db
  const { fetchBooks, books } = useDataProvider();
  useEffect(() => {
    setLoading(true);
    fetchBooks();
    setLoading(false);
  }, [fetchBooks, setLoading]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ConfirmationAlert isVisible={confirmAlert} />
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
              {books.map((book) => (
                <BookCard key={book.id} data={book} />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default All_books;
