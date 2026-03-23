import { useParams } from "react-router-dom";
import Shimmer from "./Shimmer";
import { useState, useEffect } from "react";

import { MENU_API } from "../utils/constants";

const RestaurantMenu = () => {
  const { resId } = useParams();
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, [resId]);

  const fetchMenu = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();
    setResInfo(json.data);
  };

  if (!resInfo) return <Shimmer />;

  const restaurantInfo = resInfo?.cards?.find((card) => card?.card?.card?.info)
    ?.card?.card?.info;

  const { name, cuisines, costForTwoMessage } = restaurantInfo || {};

  const regularCards = resInfo?.cards?.find((c) => c?.groupedCard)?.groupedCard
    ?.cardGroupMap?.REGULAR?.cards;

  const itemCards = regularCards
    ?.map((c) => c?.card?.card)
    ?.filter((c) => c?.itemCards)
    ?.flatMap((c) => c.itemCards);

  return (
    <div className="menu">
      <h1>{name}</h1>
      <p>
        {cuisines?.join(", ")} - {costForTwoMessage}
      </p>

      <h2>Menu</h2>

      <ul>
        {itemCards?.map((item, index) => (
          <li key={item.card.info.id + "-" + index}>
            {item.card.info.name} - ₹
            {(item.card.info.price || item.card.info.defaultPrice) / 100}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
