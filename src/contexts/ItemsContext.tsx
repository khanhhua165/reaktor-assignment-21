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
      try {
        const fetchBeanies = axios.get("/products/beanies");
        const fetchFaceMasks = axios.get("/products/facemasks");
        const fetchGloves = axios.get("/products/gloves");
        const [beanies, faceMasks, gloves] = await Promise.all([
          fetchBeanies,
          fetchFaceMasks,
          fetchGloves,
        ]);
        setBeaniesData(beanies.data);
        setFaceMasksData(faceMasks.data);
        setGlovesData(gloves.data);
      } catch (e: unknown) {
        console.log("in Items Context: " + e);
      }
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
