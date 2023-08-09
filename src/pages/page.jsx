import HomeData from "../components/HomeData";
import Loading from "../components/Loading";
import useUiContext from "../hooks/useUiContext";

const Home = () => {
  const { loading } = useUiContext();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen w-full p-4 sm:px-8">
          {/* <HomeData /> */}
        </div>
      )}
    </>
  );
};

export default Home;
