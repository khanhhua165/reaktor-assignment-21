import React from "react";
import { RouteComponentProps } from "react-router-dom";
import ClothesItem from "./ClothesItem";
import { Item } from "./ClothesItems";

interface PageParams {
  page: string;
}
interface DisplayedItemsProps extends RouteComponentProps<PageParams> {
  items: Item[];
}

const DisplayedItems = (props: DisplayedItemsProps) => {
  const displayedItems = props.items.slice(
    20 * (parseInt(props.match.params.page) - 1),
    20 * parseInt(props.match.params.page)
  );
  console.log(props.match.params.page);
  const result = displayedItems.map((item: Item) => (
    <ClothesItem key={item.id} {...item} />
  ));
  return <>{result}</>;
};

export default DisplayedItems;
