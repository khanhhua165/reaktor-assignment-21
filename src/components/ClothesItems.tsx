import React, { useContext, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { ItemsContext } from "../contexts/Contexts";
import ClothesItem from "./ClothesItem";

interface ItemParams {
  item: string;
}
type ClothesItemsProps = RouteComponentProps<ItemParams>;

export interface Item {
  id: string;
  type: string;
  name: string;
  color: string[];
  price: number;
  manufacturer: string;
}

const ClothesItems = (props: ClothesItemsProps) => {
  const [currentType, setcurrentType] = useState<string>(
    props.match.params.item
  );
  useEffect(() => {
    console.log("trigger");
    setcurrentType(props.match.params.item);
  }, [props.match.params.item]);
  const itemsContext = useContext(ItemsContext);
  let currentItems = itemsContext[currentType];
  console.log(currentItems);
  let result: JSX.Element[];
  if (!currentItems) {
    result = null!;
  } else {
    result = currentItems.map((item: Item) => (
      <ClothesItem key={item.id} {...item} />
    ));
  }
  return <div className="flex flex-col divide-y-2">{result}</div>;
};

export default ClothesItems;
