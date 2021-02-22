import React from "react";
import { Item } from "./ClothesItems";
import ColorDot from "./ColorDot";
export interface ItemWithAvailability extends Item {
  availability: string;
}
const ClothesItem = ({
  id,
  name,
  color,
  price,
  manufacturer,
  availability,
}: ItemWithAvailability) => {
  const colors = color.map((co) => <ColorDot key={co} color={co} />);
  return (
    <div className="flex flex-col items-start pl-4 bg-white rounded-md shadow-lg">
      <div className="mt-1 font-semibold">{name}</div>
      <div className="mb-4 text-sm italic text-gray-700">{id}</div>
      <div className="flex items-center w-full space-x-3">
        <div className="">Available Color:</div>
        <div className="flex space-x-1">{colors}</div>
      </div>
      <div className="flex space-x-2">
        <div className="">Manufacturer:</div>
        <div className="italic font-semibold">{manufacturer}</div>
      </div>
      <div className="flex space-x-2">
        <div className="">Price:</div>
        <div className="font-semibold">{price}€</div>
      </div>
      <div className="flex mb-1 space-x-2">
        <div className="">Availability:</div>
        <div className="">{availability}</div>
      </div>
    </div>
  );
};

export default ClothesItem;
