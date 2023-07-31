import { Link } from "react-router-dom";
import illustration from "../assets/PngItem_1965395.png";
const OptionCard = ({ data }) => {
  return (
    <Link to={data.path}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-md h-72">
        <div className={`${data.background} h-4/5`}>
          <img
            src={data.illustrations}
            alt="illustration"
            className="object-contain w-full h-full"
          />
        </div>
        <div className="font-bold px-5 py-3">{data.title}</div>
      </div>
    </Link>
  );
};

export default OptionCard;
