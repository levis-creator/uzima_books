import _ from "lodash";
import { useEffect, useState } from "react";
import HomeData from "../components/HomeData";
import Loading from "../components/Loading";
import useDataProvider from "../hooks/useDataProvider";
import useUiContext from "../hooks/useUiContext";

const Home = () => {
  const { loading, setLoading } = useUiContext();

  const { fetchBooks, books } = useDataProvider();
  const [fetchDone, setFetchDone] = useState(false);
  const [categories, setCategories] = useState([]);
  const [fetchingData, setFetchingData] = useState(true);
  useEffect(() => {
    if (!fetchDone) {
      fetchBooks();

      setFetchDone(true);
    }
  }, [fetchBooks, fetchDone, books, setLoading]);

  useEffect(() => {
    if (books.length != 0 && fetchingData) {
      setLoading(true);
      // this gives me a set of data that contain category
      let categoryList = _.map(books, "category");
      categoryList = _.flatMapDeep(categoryList);
      categoryList = _.uniq(categoryList);

      setCategories(categoryList);
      setLoading(false);
      setFetchingData(false);
    }
  }, [books, categories, fetchingData, setLoading]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="min-h-screen w-full p-4 sm:px-8">
          {_.map(categories, (category, i) => (
            <HomeData category={category} key={i} />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
