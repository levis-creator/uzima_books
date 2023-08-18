import { Link } from "react-router-dom";

const Book_card = ({ data }) => {
  return (
    <Link to={`/books/${data.id}`}>
      <div className=" overflow-hidden w-5/6 ">
        <div className=" h-52 overflow-hidden rounded-md shadow-md ">
          <img
            src={data.cover_page}
            alt="book"
            className="w-full h-full object-cover"
          />
        </div>
        <div className=" py-2">
          <h2 className="font-medium text-slate-800 text-ellipsis whitespace-nowrap overflow-hidden ">
            {data.book_name}
          </h2>
          <h2 className="text-slate-400 text-xs font-light capitalize">
            {data.author}
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default Book_card;
