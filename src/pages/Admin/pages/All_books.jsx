import React from "react";
import BookCard from "../components/BookCard";

const All_books = () => {
  return (
    <div className="p-4">
      All_books
      <div className="grid grid-cols-1 gap-2">
        <BookCard />
        <BookCard />
        <BookCard />
      </div>
    </div>
  );
};

export default All_books;
