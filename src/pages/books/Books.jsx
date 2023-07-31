import { useEffect, useState } from "react";
import { fetch_data } from "../../api/data/sample";
import Book_card from "../../components/Book_card";
import Pagination from "../../components/Pagination";
import Loading from "../Loading";
const Books = () => {
  const [book, set_book] = useState([]);
  const items_per_page = 10;
  const [current_page, set_current_page] = useState(1);
  const [total_pages, set_total_pages] = useState(0);
  const [loading, set_loading] = useState(true);
  useEffect(() => {
    const fetch = async () => {
      const data = await fetch_data(items_per_page, current_page);

      set_total_pages(Math.ceil(data.total_pages / items_per_page));
      set_book(data.results);
      set_loading(false);
    };
    fetch();
  }, [current_page]);
  const handle_page_change = ({ selected: selectedPage }) => {
    set_current_page(selectedPage);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="p-4 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:px-8">
            {console.log(book)}
            {console.log(total_pages)}
            {book.map((item) => (
              <Book_card key={item.work_id} data={item} />
            ))}
          </div>

          <div className="w-full">
            <Pagination
              handle_page_change={handle_page_change}
              total_pages={total_pages}
              initial_page={current_page}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Books;
