import Loading from "../../components/Loading";
import useUiContext from "../../hooks/useUiContext";
import { options } from "./api/local/menu_options";
import OptionCard from "./components/OptionCard";

const index = () => {
  const { loading } = useUiContext();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="p-4 grid grid-cols-1 gap-4 ">
          {options.map((items, i) => (
            <OptionCard key={i} data={items} />
          ))}
        </div>
      )}
    </>
  );
};

export default index;
