import axios from "../utils/apiCaller";
import React, { createContext, useEffect, useState } from "react";
import { Item } from "../components/ClothesItems";

interface ItemsType {
  [itemType: string]: Item[];
}
export const ItemsContext = createContext<ItemsType>({
  beanies: [],
  facemasks: [],
  gloves: [],
});

const ItemsContextComponent = (props: { children: JSX.Element }) => {
  const [beaniesData, setBeaniesData] = useState<Item[]>([]);
  const [faceMasksData, setFaceMasksData] = useState<Item[]>([]);
  const [glovesData, setGlovesData] = useState<Item[]>([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const fetchBeanies = axios.get<Item[]>("/products/beanies");
      const fetchFaceMasks = axios.get<Item[]>("/products/facemasks");
      const fetchGloves = axios.get<Item[]>("/products/gloves");
      const [beanies, faceMasks, gloves] = await Promise.all([
        fetchBeanies,
        fetchFaceMasks,
        fetchGloves,
      ]);
      setBeaniesData(beanies.data);
      setFaceMasksData(faceMasks.data);
      setGlovesData(gloves.data);
    };
    fetchAPI();
  }, []);

  return (
    <ItemsContext.Provider
      value={{
        beanies: beaniesData,
        facemasks: faceMasksData,
        gloves: glovesData,
      }}
    >
      {props.children}
    </ItemsContext.Provider>
  );
};

export default ItemsContextComponent;
