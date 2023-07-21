import { GrFormPrevious, GrNext } from "react-icons/gr";
import ReactPaginate from "react-paginate";

const Pagination = ({ total_pages, handle_page_change, initital_page }) => {
  return (
    <div>
      <ReactPaginate
        pageCount={total_pages}
        containerClassName="flex gap-3 text-lg justify-center items-center"
        onPageChange={handle_page_change}
        breakLabel="..."
        initialPage={initital_page}
        marginPagesDisplayed={1}
        pageRangeDisplayed={3}
        pageClassName="rounded-full w-12 m-0 flex justify-center items-center p-2  h-12 text-center bg-slate-200"
        previousLabel={<GrFormPrevious />}
        previousClassName="text-2xl"
        nextLabel={<GrNext />}
        activeClassName="bg-theme-color1 text-white"
      />
    </div>
  );
};

export default Pagination;
