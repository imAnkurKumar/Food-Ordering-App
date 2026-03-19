import resList from "../utils/mockData";
import RestaurentCard from "./RestaurentCard";
import { useState } from "react";

const Body = () => {
  const [listOfRestaurents, setListOfRestaurents] = useState(resList);
  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            const filteredList = listOfRestaurents.filter(
              (res) => res.data.avgRating > 4,
            );
            setListOfRestaurents(filteredList);
          }}>
          Top Rated Restaurents
        </button>
      </div>
      <div className="res-container">
        {listOfRestaurents.map((restaurent) => (
          <RestaurentCard key={restaurent.data.id} resData={restaurent} />
        ))}
      </div>
    </div>
  );
};
export default Body;
