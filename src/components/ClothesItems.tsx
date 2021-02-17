import React, { useContext, useMemo } from "react";
import { RouteComponentProps } from "react-router-dom";
import { ItemsContext } from "../contexts/ItemsContext";
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
  const { beanies, facemasks, gloves } = useContext(ItemsContext);
  const beaniesResults = useMemo(
    () => beanies.map((item: Item) => <ClothesItem key={item.id} {...item} />),
    [beanies]
  );
  const facemasksResults = useMemo(
    () =>
      facemasks.map((item: Item) => <ClothesItem key={item.id} {...item} />),
    [facemasks]
  );
  const glovesResults = useMemo(
    () => gloves.map((item: Item) => <ClothesItem key={item.id} {...item} />),
    [gloves]
  );

  let result: JSX.Element[];
  switch (props.match.params.item) {
    case "beanies":
      result = beaniesResults;
      break;
    case "facemasks":
      result = facemasksResults;
      break;
    case "gloves":
      result = glovesResults;
      break;
    default:
      result = null!;
  }

  return <div className="grid grid-cols-4 gap-3 mt-4">{result}</div>;
};

export default ClothesItems;
