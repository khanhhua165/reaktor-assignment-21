import React from "react";
import { Item } from "./ClothesItems";
import ColorDot from "./ColorDot";
export interface ItemWithAvailability extends Item {
  availability: string;
}
const ClothesItem = ({
  id,
  type,
  name,
  color,
  price,
  manufacturer,
  availability,
}: ItemWithAvailability) => {
  console.log(color);
  return (
    <div className="flex flex-col items-start pl-4 bg-white rounded-md shadow-lg">
      <div className="font-semibold">{name}</div>
      <div className="italic text-gray-700">{type}</div>
      <div className="flex">
        {color.map((color) => (
          <>
            <ColorDot color={color} />
            <div>{color}</div>
          </>
        ))}
      </div>
    </div>
  );
};

export default ClothesItem;
