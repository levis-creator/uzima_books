import { collection, getDocs, limit, query, where } from "firebase/firestore";
import _ from "lodash";
import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import Book_card from "../Book_card";
import useUiContext from "../../hooks/useUiContext";

const Index = ({ category }) => {
  const [data, setData] = useState([]);
  const { setLoading } = useUiContext();
  useEffect(() => {
    const items = async () => {
      const q = query(
        collection(db, "books"),
        where("category", "array-contains", category),
        limit(4)
      );
      await getDocs(q).then((data) => {
        let newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setData(newData);
      });
      setLoading(false);
    };
    items();
  }, [category, setLoading]);

  return (
    <div className="space-y-5">
      <h2 className=" text-xl capitalize  font-light">{category}</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {_.map(data, (data) => (
          <Book_card key={data.id} data={data} />
        ))}
      </div>
    </div>
  );
};

export default Index;
