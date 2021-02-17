import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ClothesItems, { Item } from "./components/ClothesItems";
import { ItemsContext, StatusContext } from "./contexts/Contexts";
import axios from "./utils/apiCaller";

const App: React.FC = () => {
  const [beaniesData, setBeaniesData] = useState<Item[]>([]);
  const [faceMasksData, setFaceMasksData] = useState<Item[]>([]);
  const [glovesData, setGlovesData] = useState<Item[]>([]);
  useEffect(() => {
    console.log("FETCHING");
    const fetchAPI = async () => {
      const fetchBeanies = axios.get("/products/beanies");
      const fetchFaceMasks = axios.get("/products/facemasks");
      const fetchGloves = axios.get("/products/gloves");
      const [beanies, faceMasks, gloves] = await Promise.all([
        fetchBeanies,
        fetchFaceMasks,
        fetchGloves,
      ]);
      setBeaniesData(JSON.parse(beanies.data.contents));
      setFaceMasksData(JSON.parse(faceMasks.data.contents));
      setGlovesData(JSON.parse(gloves.data.contents));
    };
    fetchAPI();
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <ItemsContext.Provider
        value={{
          beanies: beaniesData,
          facemasks: faceMasksData,
          gloves: glovesData,
        }}
      >
        <StatusContext.Provider value={null}>
          <div className="font-sans">
            <Switch>
              <Redirect from="/" exact to="/beanies" />
              <Route path="/:item" component={ClothesItems} />
            </Switch>
          </div>
        </StatusContext.Provider>
      </ItemsContext.Provider>
    </BrowserRouter>
  );
};

export default App;
