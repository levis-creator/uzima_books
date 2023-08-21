import _ from "lodash";
import { useEffect, useState } from "react";
import Book_card from "../../components/Book_card";
import Loading from "../../components/Loading";
import useDataProvider from "../../hooks/useDataProvider";
import useUiContext from "../../hooks/useUiContext";
const Books = () => {
  const { book, paginate, showNext, showPrev, page, setPage } =
    useDataProvider();
  const { loading } = useUiContext();
  const [entry, setEntry] = useState(false);
  useEffect(() => {
    if (!entry) {
      paginate();
      setPage(1);
      setEntry(true);
    }
  }, [paginate, entry, setPage]);
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="p-4 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:px-8">
            {console.log(book)}

            {_.map(book, (item) => (
              <Book_card key={item.work_id} data={item} />
            ))}
          </div>

          <div className="w-full">
            <div className="w-full flex justify-center gap-x-3 items-center">
              <button
                onClick={() => showPrev({ item: book[0] })}
                className={`bg-theme-color1 text-white p-2 rounded-l-2xl disabled:bg-neutral-500`}
                disabled={page == 1 ? true : false}
              >
                Prev
              </button>
              {page}
              <button
                onClick={() => showNext({ item: book[book.length - 1] })}
                className="bg-theme-color1 text-white p-2 rounded-r-2xl disabled:bg-neutral-500"
                disabled={book.length < 5 ? true : false}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Books;
