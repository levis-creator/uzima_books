import BounceLoader from "react-spinners/BounceLoader";
const Loading = () => {
  return (
    <div className=" w-screen h-screen fixed top-0 bottom-0 right-0 left-0 bg-white flex items-center justify-center">
      <div className="gap-5 last:flex flex-col items-center justify-center">
        <BounceLoader color="#0945a9" />
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
