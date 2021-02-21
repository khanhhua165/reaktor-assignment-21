import React from "react";
import { Item } from "./ClothesItems";
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
  return (
    <div className="flex flex-col items-start pl-4 bg-gray-300 rounded-md">
      <div className="">ID: {id}</div>
      <div>type: {type}</div>
      <div className="">name: {name}</div>
      <div className="">color: {color[0]}</div>
      <div className="">price: {price}$</div>
      <div className="">manufacturer: {manufacturer}</div>
      <div className="">Availability: {availability}</div>
    </div>
  );
};

export default ClothesItem;
