import { useEffect, useState } from "react";
import { fetch_data } from "../../api/data/sample";
import Book_card from "../Book_card";

const Index = ({}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetching = async () => {
      const response = await fetch_data(5, 1);
      setData(response.results);
      console.log(response);
    };
    fetching();
  }, []);
  return (
    <div>
      <h2 className="font-bold text-lg">Fiction</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {data.map((items) => (
          <Book_card key={items.work_id} data={items} />
        ))}
      </div>
    </div>
  );
};

export default Index;
