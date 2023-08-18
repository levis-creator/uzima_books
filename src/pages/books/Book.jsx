import { collection, getDocs, limit, query, where } from "firebase/firestore";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import Book_card from "../../components/Book_card";
import useDataProvider from "../../hooks/useDataProvider";
import { db } from "../../lib/firebase";

const Book = () => {
  const { id } = useParams();
  const { getBook, book } = useDataProvider();
  const navigate = useNavigate();
  const [fetchbook, setFetchBook] = useState(false);
  const [recommendedData, setRecommendedData] = useState();
  //  recommends
  const recommending = useCallback(async () => {
    const q = query(
      collection(db, "books"),
      where("category", "array-contains-any", book.category),
      limit(6)
    );
    await getDocs(q).then((data) => {
      let newData = _.map(data.docs, (doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      newData = _.filter(newData, (data) => data.id !== book.id);
      setRecommendedData(newData);
    });
  }, [book]);
  useEffect(() => {
    if (!fetchbook || id != book.id) {
      getBook(id);
      setFetchBook(true);
    }
  }, [fetchbook, getBook, id, recommending, book]);
  useEffect(() => {
    recommending();
  }, [recommending]);

  return (
    <div className=" min-h-screen text-slate-600">
      <div className="flex items-start w-full justify-center text-center p-4">
        <button
          onClick={() => navigate(-1)}
          className="text-2xl text-slate-600"
        >
          <IoIosArrowBack />
        </button>
        <div className="flex-1 text-lg font-medium">{book.book_name}</div>
      </div>
      <div className="relative w-full">
        <div className=" w-full h-64 left-0 right-0">
          <img
            src={book.cover_page}
            alt={book.book_name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute top-0 right-0 left-0 bottom-0 bg-white bg-opacity-90 flex items-center justify-center">
          <div className="flex flex-col w-3/4 h-auto items-center">
            <div className="rounded-md w-1/3 overflow-hidden shadow-lg">
              <img
                src={book.cover_page}
                alt={book.book_name}
                className=" h-full w-full"
              />
            </div>
            <div className="capitalize text-slate-700 tex">
              Author: {book.author}
            </div>
          </div>
        </div>
      </div>
      <div className="text-base bg-slate-200 py-4 my-10 mx-auto w-fit px-10 rounded-lg font-medium">
        <span className="font-semibold  text-black ">{book.pages}</span> Pages
      </div>
      <div className="px-5">
        <h2 className=" text-black font-medium ">Description</h2>
        <p
          className="text-black
        "
        >
          {book.book_description}
        </p>
      </div>
      <MoreBooks title={"Recommends"} data={recommendedData} />
    </div>
  );
};

export default Book;

const MoreBooks = ({ title, data }) => {
  return (
    <div className="p-5">
      <h2 className="font-medium text-black py-5 ">{title}</h2>
      <div className="grid grid-cols-2">
        {_.map(data, (data) => (
          <Book_card key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};
