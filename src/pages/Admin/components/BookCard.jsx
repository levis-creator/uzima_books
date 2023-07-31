const BookCard = () => {
  return (
    <div className="rounded-md overflow-hidden gap-2 bg-white w-full h-32 flex shadow-sm pr-4">
      <div className="h-full w-full basis-1/3">
        <img
          src="/books/paolo-chiabrando-9dXSoi6VXEA-unsplash.jpg"
          className="h-full w-full  object-cover"
        />
      </div>
      <div className="w-full flex flex-col">
        <h2 className="font-semibold text-lg">Book card</h2>
        <h2 className="font-normal text-slate-400 text-xs">categories</h2>
        <p className="text-sm h-2/4 overflow-hidden">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint ipsam
          eum odit adipisci deserunt maxime debitis corrupti aut fugit quis,
          quisquam sapiente itaque, nulla perferendis! Unde commodi tempore
          recusandae obcaecati? recusandae obcaecati?
        </p>
        <div className="text-xs text-slate-400"> 200 pages </div>
      </div>
    </div>
  );
};

export default BookCard;
