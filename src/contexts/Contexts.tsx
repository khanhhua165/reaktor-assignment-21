import { createContext } from "react";
import { Item } from "../components/ClothesItems";

interface ItemsType {
  [itemType: string]: Item[];
}
export const ItemsContext = createContext<ItemsType>({
  beanies: [],
  facemasks: [],
  gloves: [],
});
export const StatusContext = createContext(null);
