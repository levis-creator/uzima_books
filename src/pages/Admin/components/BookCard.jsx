import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { db, storage } from "../../../lib/firebase";
import useDataProvider from "../../../hooks/useDataProvider";

const BookCard = ({ data }) => {
  const { id } = useParams();
  const { deleteBook } = useDataProvider();
  const removeUrl = (url) => {
    if (url != undefined) {
      let text1 = `https://firebasestorage.googleapis.com/v0/b/uzima-books.appspot.com/o/books%2F`;
      let newText = url.replace(text1, "");
      let index = newText.indexOf("?");
      var final = newText.substr(0, index);
      return final;
    }
  };
  const handleDelete = async () => {
    deleteBook(data.cover_page, data.id);
  };
  return (
    <div className="rounded-md overflow-hidden gap-2 bg-white w-full h-32 flex shadow-sm pr-4">
      <div className="h-full w-full basis-1/3">
        <img src={data.cover_page} className="h-full w-full  object-cover" />
      </div>
      <div className="w-full flex flex-col">
        <h2 className="font-semibold text-lg">{data.book_name}</h2>
        <h2 className="font-normal text-slate-400 text-xs">{data.category}</h2>
        <p className="text-sm h-2/4 overflow-hidden">{data.book_description}</p>
        <div className="text-xs text-slate-400">{data.pages}</div>
        <div className="flex justify-end gap-3 ">
          <Link to={`${data.id}`}>
            <button className=" text-xl p-1 rounded-full text-slate-600 active:bg-slate-100 ">
              <AiFillEdit />
            </button>
          </Link>
          <button
            className=" active:bg-slate-100 p-1 text-xl rounded-full text-slate-600"
            onClick={handleDelete}
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
