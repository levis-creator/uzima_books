import { useEffect } from "react";
import { categories } from "../api/local/categories";
import HomeData from "../components/HomeData";

const Home = () => {
  return (
    <div className="min-h-screen w-full p-4">
      <HomeData />
    </div>
  );
};

export default Home;
