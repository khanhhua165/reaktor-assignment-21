import React, { useState } from "react";
import { RouteComponentProps, useParams } from "react-router-dom";

interface ClothesItemsProps extends RouteComponentProps {}

interface Items {
  id: string;
  type: string;
  name: string;
  color: string[];
  price: number;
  manufacturer: string;
}

const ClothesItems = (props: ClothesItemsProps) => {
  const [items, setItems] = useState<Items[]>([]);
  const itemsName = useParams();
  return <div className="">hahahaha</div>;
};

export default ClothesItems;
