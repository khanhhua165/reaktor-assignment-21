import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { ITEM_PER_PAGE } from "../constants";
import ClothesItem from "./ClothesItem";
import { Item } from "./ClothesItems";

interface PageParams {
  page: string;
}
export interface DisplayedItemsProps extends RouteComponentProps<PageParams> {
  items: Item[];
}

const DisplayedItems = (props: DisplayedItemsProps) => {
  const displayedItems = props.items.slice(
    ITEM_PER_PAGE * (parseInt(props.match.params.page) - 1),
    ITEM_PER_PAGE * parseInt(props.match.params.page)
  );
  const result = displayedItems.map((item: Item) => (
    <ClothesItem key={item.id} {...item} availability="NOT AVAILABLE NOW!" />
  ));
  return (
    <div className="grid grid-cols-1 gap-3 px-4 pt-16 pb-4 mt-4 sm:pr-2 sm:pl-56 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {result}
    </div>
  );
};

export default DisplayedItems;
