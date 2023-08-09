import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../../lib/firebase";

const All_books = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  // gets from db
  const fetchBooks = async () => {
    await getDocs(collection(db, "books")).then((data) => {
      const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setData(newData);
    });
  };
  useEffect(() => {
    fetchBooks();
  }, []);
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
        {data.map((book) => (
          <BookCard key={book.id} data={book} />
        ))}
      </div>
    </div>
  );
};

export default All_books;
