import React from "react";
import { Item } from "./ClothesItems";

const ClothesItem = ({ id, type, name, color, price, manufacturer }: Item) => {
  return (
    <div className="flex flex-col items-start bg-gray-300">
      <div className="">ID: {id}</div>
      <div>type: {type}</div>
      <div className="">name: {name}</div>
      <div className="">color: {color[0]}</div>
      <div className="">price: {price}$</div>
      <div className="">manufacturer: {manufacturer}</div>
    </div>
  );
};

export default ClothesItem;
