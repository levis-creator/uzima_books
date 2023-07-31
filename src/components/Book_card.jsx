const Book_card = ({ data }) => {
  return (
    <div className="rounded-xl bg-white overflow-hidden shadow-md">
      <div className="w-full h-72 overflow-hidden">
        <img
          src={data.published_works[0].cover_art_url}
          alt="book"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="px-3 py-2">
        <h2 className="font-bold">{data.title}</h2>
        <h2 className="text-slate-400 text-xs font-light">{data.authors}</h2>
      </div>
    </div>
  );
};

export default Book_card;
